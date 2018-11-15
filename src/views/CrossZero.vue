<template>
  <div class="home">
    <h2 v-if="friend"> Now you play with Friend</h2>
    <h2 v-if="!friend"> Now you play with Computer</h2>
    <button class="button" @click='friend=!friend' v-if="friend"> Computer</button>
    <button class="button" @click='friend=!friend' v-if="!friend"> Friend</button>
    <router-view/>
    <crossZero v-if="friend" :player="true"/>
    <crossZero v-if="!friend" :player="false"/>
  </div>
</template>

<script>
// @ is an alias to /src
import crossZero from '@/components/cross-zero.vue'

export default {
  name: 'home',
  components: {
    crossZero
  },
  data () {
    return {
      friend: true
    }
  }
}
</script>

<style scoped>
.button {
  background: rgba(183, 235, 236, 0.8);
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
