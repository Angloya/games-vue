<template>
  <div class="CardGame">
    <div class='infoGameMove'>
      <h1>{{message}}</h1>
      <span v-if='!newGame' class='Info'>
      <h2>move: <b>{{move}}</b></h2>
      <h2>time: <b>{{gameTime}}</b></h2>
      </span>
    </div>
    <div class="game">
    <div class='newGame' v-if='newGame'>
    <button class="button" @click='startNewGame'>Play again</button>
    </div>
    <div class='cards'>
    <div v-for="(card, idx) in cards" v-bind:class="{'select': card.select, 'won': card.won, 'nonselect': card.won}" @click="selectCard(card)" class="card" :key="idx">
      <transition name="fade">
     <img v-if='card.select || card.won' :src='card.img' :alt='card.name'>
      </transition>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: Boolean
  },
  data () {
    return {
      message: null,
      newGame: false,
      count: 0,
      countCard: 0,
      setTimeout: null,
      setInter: null,
      Timeout: null,
      gameTime: 60,
      move: 0,
      myCards: [
        {
          id: 1,
          name: '1',
          select: true,
          won: false,
          img: require('../assets/card1.jpg')
        },
        {
          id: 2,
          name: '1',
          select: true,
          won: false,
          img: require('../assets/card1.jpg')
        },
        {
          id: 3,
          name: '2',
          select: true,
          won: false,
          img: require('../assets/card2.jpg')
        },
        {
          id: 4,
          name: '2',
          select: true,
          won: false,
          img: require('../assets/card2.jpg')
        },
        {
          id: 5,
          name: '3',
          select: true,
          won: false,
          img: require('../assets/card3.jpg')
        },
        {
          id: 6,
          name: '3',
          select: true,
          won: false,
          img: require('../assets/card3.jpg')
        },
        {
          id: 7,
          name: '4',
          select: true,
          won: false,
          img: require('../assets/card4.jpg')
        },
        {
          id: 8,
          name: '4',
          select: true,
          won: false,
          img: require('../assets/card4.jpg')
        },
        {
          id: 9,
          name: '5',
          select: true,
          won: false,
          img: require('../assets/card5.jpg')
        },
        {
          id: 10,
          name: '5',
          select: true,
          won: false,
          img: require('../assets/card5.jpg')
        },
        {
          id: 11,
          name: '6',
          select: true,
          won: false,
          img: require('../assets/card6.jpg')
        },
        {
          id: 12,
          name: '6',
          select: true,
          won: false,
          img: require('../assets/card6.jpg')
        }
      ],
      cards: []
    }
  },
  created () {
    this.newGame = true
    this.cards = this.myCards.slice()
  },
  computed: {
    changeCards () {
      return this.cards
    }
  },
  methods: {
    noShowCard () {
      for (let key in this.cards) {
        this.cards[key].select = false
        this.cards[key].won = false
      }
    },
    timerGame () {
      this.setInter = setInterval(() => {
        if (this.gameTime > 0) {
          this.gameTime -= 1
        } else {
          clearInterval(this.setInter)
          this.message = "time's up"
          this.newGame = true
        }
      }, 1000)
    },
    createGame () {
      this.message = null
      this.cards = this.myCards.slice()
      var randomIndex = null
      this.gameTime = 60
      this.move = 0
      var randomCard = {}
      for (var i = 0; i < this.cards.length; i++) {
        randomIndex = Math.floor(Math.random() * 10)
        randomCard = this.cards[i]
        this.cards[i] = this.cards[randomIndex]
        this.cards[randomIndex] = randomCard
      }
      this.setTimeout = setTimeout(() => {
        this.noShowCard()
        this.timerGame()
      }, 3000)
    },
    selectCard (card) {
      if (this.countCard !== 12) {
        if (!card.select) {
          this.count += 1
          this.move += 1
          if (this.count < 2) {
            card.select = true
          } else if (this.count === 2) {
            card.select = true
            this.Timeout = setTimeout(() => {
              this.checkCard()
              this.count = 0
            }, 500)
          }
        }
      } else {
        this.message = 'Your win'
      }
    },
    checkCard () {
      var selectCard = this.cards.filter(p => p.select === true)
      if (selectCard[0].name === selectCard[1].name) {
        for (let key in this.cards) {
          if (this.cards[key].id === selectCard[0].id || this.cards[key].id === selectCard[1].id) {
            this.cards[key].won = true
            this.cards[key].select = false
            this.countCard += 1
            if (this.countCard === 12) {
              this.message = 'Your win'
              this.newGame = true
              clearInterval(this.setInter)
            }
          }
          this.count = 0
        }
      } else {
        for (let key in this.cards) {
          if (this.cards[key].id === selectCard[0].id || this.cards[key].id === selectCard[1].id) {
            this.cards[key].select = false
          }
        }
        this.count = 0
      }
    },
    startNewGame () {
      clearTimeout(this.setTimeout)
      clearTimeout(this.Timeout)
      clearInterval(this.setInter)
      this.newGame = false
      this.message = null
      this.gameTime = 60
      this.move = 0
      this.cards = this.myCards.slice()
      this.countCard = 0
      for (let key in this.cards) {
        this.cards[key].select = true
        this.cards[key].won = false
      }
      this.createGame()
    },
    getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
}
</script>

<style scoped>
.CardGame {
  width: 370px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.infoGameMove {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 80px;
}
.Info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.infoGameMove h2 {
  font-weight: 300
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.newGame {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 370px;
    background: rgba(173, 183, 184, 0.3);
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
  max-height: 100px;
  max-width: 100px
}
.cards .card:hover {
  transform: scale(1.1, 1.1);
  background: rgb(107, 191, 194);
}
.cards .select {
  border: 2px solid black
}
.button {
  background: rgb(137, 231, 233);
  margin: 30px;
  padding: 30px;
  border: 1px solid black;
  border-radius: 0px;
  font-size: 15px;
  cursor: pointer;
}
.button:hover {
  background: rgb(107, 191, 194);
  transform: scale(1.3, 1.3);
}
</style>
