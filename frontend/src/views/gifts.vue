<script>
import axios from 'axios'
import GiftCard from '@/components/gift-card.vue'

export default {
  name: 'Gifts',
  components: {
    GiftCard,
  },
  data() {
    return {
      gifts: [],
    }
  },
  async created() {
    const giftsRequest = await axios.get('/api/gifts')
    this.gifts = giftsRequest.data
  },
}
</script>

<template lang="pug">
  .Gifts
    h1 Gifts
    gift-card(v-for="gift in gifts" :gift="gift")
</template>
