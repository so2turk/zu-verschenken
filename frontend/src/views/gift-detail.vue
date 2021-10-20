<script>
import GiftCard from '@/components/gift-card.vue'
import CommentCard from '@/components/comment-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'GiftDetail',
  components: { GiftCard, CommentCard },
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
    GiftCard(:gift="gift" v-if="gift")
    CommentCard
</template>
