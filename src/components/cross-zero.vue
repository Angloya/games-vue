<template>
  <div class="Cross-zero">
    <h1>{{message}}</h1>
    <div class='infoGameMove'>
    <h2>zero: <b>{{countZero}}</b></h2>
    <h2>Moves left: <b>{{count}}</b></h2>
    <h2>cross: <b>{{countCross}}</b></h2>
    </div>
    <div class='cards' v-if="zero">
    <div v-for="(card, idx) in cards" v-bind:class="[card.win]" @click="moveZero(card)" class="card" :key="idx">
        <img src="../assets/zero.png" v-if="card.zero" alt="zero">
        <img src="../assets/cross.png" v-if="card.cross" alt="cross">
      </div>
    </div>
    <div class='cards' v-if="cross">
    <div v-for="(card, idx) in cards" v-bind:class="[card.win]" @click="moveCross(card)" class="card" :key="idx">
        <img src="../assets/zero.png" v-if="card.zero" alt="zero">
        <img src="../assets/cross.png" v-if="card.cross" alt="cross">
      </div>
    </div>
    <button v-if='newGame' class="button" @click='startNewGame'>Play again</button>
  </div>
</template>

<script>
export default {
  props: {
    player: Boolean
  },
  data () {
    return {
      zero: false,
      cross: true,
      message: null,
      count: 9,
      newGame: false,
      countZero: 0,
      countCross: 0,
      countDraw: 0,
      cards: {
        1: {
          zero: null,
          cross: null,
          win: ''
        },
        2: {
          zero: null,
          cross: null,
          win: ''
        },
        3: {
          zero: null,
          cross: null,
          win: ''
        },
        4: {
          zero: null,
          cross: null,
          win: ''
        },
        5: {
          zero: null,
          cross: null,
          win: ''
        },
        6: {
          zero: null,
          cross: null,
          win: ''
        },
        7: {
          zero: null,
          cross: null,
          win: ''
        },
        8: {
          zero: null,
          cross: null,
          win: ''
        },
        9: {
          zero: null,
          cross: null,
          win: ''
        }
      },
      winConditions: [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]]
    }
  },
  computed: {
    GamePlayer () {
      return this.player
    }
  },
  watch: {
    GamePlayer () {
      this.startNewGame()
      this.countDraw = 0
      this.countZero = 0
      this.countCross = 0
    }
  },
  methods: {
    moveZero (card) {
      if (this.count !== 0) {
        if (!card.zero && !card.cross) {
          card.zero = true
          if (this.checkForWin('zero')) {
            this.message = 'Zero win'
            this.newGame = true
            this.countZero += 1
            this.count = 0
          } else {
            if (this.count === 1) {
              this.count -= 1
              this.message = 'Draw'
              this.newGame = true
              this.countDraw += 1
            } else {
              this.zero = false
              this.cross = true
              this.count -= 1
            }
          }
        }
      }
    },
    moveCross (card) {
      if (this.count !== 0) {
        if (!card.zero && !card.cross) {
          card.cross = true
          if (this.checkForWin('cross')) {
            this.message = 'Cross win'
            this.countCross += 1
            this.newGame = true
            this.count = 0
          } else {
            if (this.count === 1) {
              this.count -= 1
              this.message = 'Draw'
              this.countDraw += 1
              this.newGame = true
            } else {
              this.cross = false
              this.zero = true
              this.count -= 1
              if (!this.player) {
                this.GameComputer()
              }
            }
          }
        }
      }
    },
    checkForWin (arg) {
      for (let i = 0; i < this.winConditions.length; i++) {
        let wc = this.winConditions[i]
        let cards = this.cards
        if (cards[wc[0]][arg] && cards[wc[1]][arg] && cards[wc[2]][arg]) {
          cards[wc[0]].win = 'win'
          cards[wc[1]].win = 'win'
          cards[wc[2]].win = 'win'
          return true
        }
      }
      return false
    },
    startNewGame () {
      this.newGame = false
      for (let key in this.cards) {
        this.cards[key].zero = null
        this.cards[key].cross = null
        this.cards[key].win = ''
        this.zero = false
        this.cross = true
      }
      this.count = 9
      this.message = null
    },
    GameComputer () {
      var card = String(this.getRandomInt(1, 9))
      if (this.count !== 0) {
        if (!this.cards[card].zero && !this.cards[card].cross) {
          this.cards[card].zero = true
          if (this.checkForWin('zero')) {
            this.message = 'Zero win'
            this.newGame = true
            this.countZero += 1
            this.count = 0
          } else {
            if (this.count === 1) {
              this.count -= 1
              this.message = 'Draw'
              this.newGame = true
              this.countDraw += 1
            } else {
              this.zero = false
              this.cross = true
              this.count -= 1
            }
          }
        } else {
          this.GameComputer()
        }
      }
    },
    getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
}
</script>

<style scoped>
.infoGameMove {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 40px;
}
.infoGameMove h2 {
  font-weight: 300
}
.cards {
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-template-columns: repeat(3, 100px);
  justify-content: center;
  grid-gap: 10px;
  margin-top: 30px
}
.cards .card {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
  background: rgb(138, 230, 233);
  display: flex;
  justify-content: center;
  align-items: center
}
.cards .card img {
  max-height: 50px;
  max-width: 50px
}
.cards .card:hover {
  transform: scale(1.05, 1.05);
  background: rgb(107, 191, 194);
}
.cards .win {
  background: red
}
.button {
  background: rgba(183, 235, 236, 0.8);
  margin: 30px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
}
.button:hover {
  background: rgb(107, 191, 194);
}
</style>
