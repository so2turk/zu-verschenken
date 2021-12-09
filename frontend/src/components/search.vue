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
      if(this.search){
        const regex = new RegExp(this.search, 'gi');
        this.matchArray = this.gifts.filter(gift => gift.name.match(regex) || gift.name.match(regex))
        this.ready = true
      }else{
        this.ready = false
      }
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
    form(class="search-form")
      input(v-model="search" type="text" class="search" @input="displayMatches()" placeholder="Quick Search")
      ul(v-show="ready" class="suggestions")
        li(v-for="(gift, i) in matchArray" :key="i" @click="chooseGift(gift)" class="suggestion")
          router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
      
</template>
