<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "InterestedIn",
  props: [
    "gift"
  ],
  data() {
    return { 
      interested: false,
      numOfInterested: 0,
    }
  },
  created(){
      this.interested = this.user.interestIn.some(interestedGift => interestedGift._id == this.gift._id)
      this.numOfInterested = this.gift.interestBy.length
  },
  methods: {
    ...mapActions(['showInterest', 'unInterest']),
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  .InterestedIn(v-if="gift")
    .div
      .div(v-if="user")
        img(v-if="interested" @click="unInterest({ giftId: gift._id }); numOfInterested--; interested = !interested" width=22 src="../assets/heart-green.png") 
        img(v-else @click="showInterest({ giftId: gift._id }); numOfInterested++; interested = !interested" width=22 src="../assets/heart.png")
        |  {{ numOfInterested }}
      .div(v-else)
        img(width=22 src="../assets/heart.png")
        |  {{ numOfInterested }}
</template>