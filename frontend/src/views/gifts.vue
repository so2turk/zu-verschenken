<script>
import axios from 'axios'
import GiftCard from '@/components/gift-card.vue'

export default {
  name: 'Gifts',
  components: { GiftCard },
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
    .div(id="page-wrap")
      .div(class="grid-wrap")
        gift-card(v-for="gift in gifts.slice().reverse()" :gift="gift" :key="gift._id")
</template>

<style scoped>
  .grid-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-araund;
      margin-top: 16px;
    }
</style>