<script>
import GiftCard from '@/components/gift-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'GiftDetail',
  components: { GiftCard },
  data() {
    return {
      gift: null,
    }
  },
  async created() {
    this.gift = await this.fetchGift(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchGift']),
  },
}
</script>

<template lang="pug">
  .GiftDetail
    h1 This is a gift detail
    GiftCard(:gift="gift" v-if="gift")
</template>
