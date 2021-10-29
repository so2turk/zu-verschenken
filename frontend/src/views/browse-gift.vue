<script>
import { mapActions } from 'vuex'

export default {
  name: 'BrowseGift',
  data() {
    return { 
        gifts: [],
        search: '',
        ready: false,
        matchArray: [],
        result: null
    }
  },
  async created() {
    this.gifts = await this.fetchGifts()
  },
  methods: {
    ...mapActions(['fetchGifts']),

    displayMatches() {
        const regex = new RegExp(this.search, 'gi');
        this.matchArray = this.gifts.filter(gift => gift.name.match(regex))
        this.ready = true
    },
    chooseGift(gift) {
      this.result = gift;
      this.ready = false;
    },
  },
}
</script>

<template lang="pug">
  .GiftList
    p
    h2 Browse Gifts
    p

    form(class="search-form")
      input(v-model="search" type="text" class="search" @input="displayMatches()" placeholder="Gift name")
      .dropdown(v-show="ready" class="suggestions")
        .dropdown-content
          li(v-for="(gift, i) in matchArray" :key="i" @click="chooseGift(gift)" class="suggestion")
            router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
    p
    p  
      
</template>

<style lang="scss" scoped>
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}
</style>