<script>
import GiftCard from '@/components/gift-card.vue'
import CommentCard from '@/components/comment-card.vue'
import GoogleMaps from '@/components/google-maps.vue'

import { mapActions } from 'vuex'

export default {
  name: 'GiftDetail',
  components: { GiftCard, CommentCard, GoogleMaps },
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
  .GiftDetail
    GiftCard(:gift="gift" v-if="gift")
    .box
      .row-2
        .col-2
          CommentCard(:gift="gift" v-if="gift" @addComment="updateGift()")
        .col-1
          GoogleMaps(:gift="gift" v-if="gift")
</template>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}

.box {
  padding: 1rem;
  width: 800px;
  border: 1px solid rgb(39, 61, 4);
  background-color: #dd0;
  border-radius: 0.3rem;
}

.row-1 {
  height: 50px;
  // border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.row-2 {
  //border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.col-1 {
  background: #dd5;
}
.col-2 {
  background: #dd5;
  flex-grow: 0;
  padding: 2px;
}
</style>