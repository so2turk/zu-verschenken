<script>
import axios from 'axios'
import GiftCard from '@/components/gift-card.vue'

export default {
  name: 'Gift',
  components: {
    GiftCard,
  },
  data() {
    return {
      gifts: [],
    }
  },
  async created() {
    const usersRequest = await axios.get('/api/gifts')
    this.gifts = usersRequest.data
  },
}
</script>

<template lang="pug">
  .Gift
    h1 Gifts
    gift-card(v-for="gift in gifts" :gift="gift")
</template>
