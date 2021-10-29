<script>
import { mapActions } from 'vuex'

export default {
  name: 'Search',
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
        this.matchArray = this.gifts.filter(gift => gift.name.match(regex) || gift.name.match(regex))
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
      ul(v-show="ready" class="suggestions")
        li(v-for="(gift, i) in matchArray" :key="i" @click="chooseGift(gift)" class="suggestion")
          router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
    p
    p  
      
</template>
