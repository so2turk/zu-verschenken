<script>
import GiftDetailCard from '@/components/gift-detail-card.vue'
import CommentCard from '@/components/comment-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'GiftDetail',
  components: { GiftDetailCard, CommentCard },
  data() {
    return {
      gift: null,
    }
  },
  async created() {
    this.updateGift()
  },
  methods: {
    ...mapActions(['fetchGift']),

    async updateGift(){
      this.gift = await this.fetchGift(this.$route.params.id)
    }
  },
}
</script>

<template lang="pug">
  .GiftDetail(id="page-wrap")
    .row-1
      GiftDetailCard(:gift="gift" v-if="gift" @anyChange="updateGift()")
    .row-1
      .col-6
        CommentCard(:gift="gift" v-if="gift" @addComment="updateGift()")
</template>
