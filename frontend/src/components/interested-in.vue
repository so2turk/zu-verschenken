<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "InterestedIn",
  data() {
    return { 
      gift: null,
      rerenderKey: 0,
      interested: false,
      numOfInterested: 0,
    }
  },
  async created() {
    this.gift = await this.fetchGift(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchGift', 'interestedIn', 'interestedOut']),
    
    areYouInterested(){
      if(this.user.interestIn.find(interestedGift => interestedGift._id == this.gift._id)) this.interested = true
      this.numOfInterested = this.gift.interestBy.length
      console.log("rerenderKey:", this.interested, "numOfInterested:", this.numOfInterested)
    },
    
    rerender() {
      this.rerenderKey += 1;
      console.log("rerenderKey:", this.rerenderKey)
    },
    
    async showInterest(e) {
      console.log(this.user.name)
      try {
        await this.interestedIn({
          userId: this.user._id,
          giftId: this.gift._id,
        })
      } catch (e) {
        console.log(console.error((e).message))
      }
    },
    
    async unInterest(e) {
      console.log(this.user.name)
      console.log(this.gift.name)
      try {
        await this.interestedOut({
          userId: this.user._id,
          giftId: this.gift._id,
        })
      } catch (e) {
        console.log(console.error((e).message))
      }
    },
  },
    computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  .InterestedIn
    .div {{ areYouInterested() }} 
      p(v-if="interested" :key="rerenderKey")
        img(v-on:click="unInterest(); numOfInterested++; interested = !interested; rerender()" width=20 src="../assets/heart-green.png") 
        |  {{ numOfInterested }}
      p(v-else)
        img(@click="showInterest(); numOfInterested--; interested = !interested; rerender()" width=20 src="../assets/heart-black.png")
        |  {{ numOfInterested }}
</template>