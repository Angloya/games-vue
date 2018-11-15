<template>
<div>
  <cards/>
</div>
</template>

<script>
import cards from '@/components/cards.vue'

export default {
  name: 'home',
  components: {
    cards
  },
  data () {
    return {
      friend: true
    }
  }
}
</script>
