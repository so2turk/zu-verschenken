<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'GiftList',
  components: {},
  data() {
    return { gifts: [] }
  },
  async created() {
    this.gifts = await this.fetchGifts()
  },
  methods: {
    ...mapActions(['fetchGifts']),
  },
}
</script>

<template lang="pug">
    .GiftList
      h1 Gift detail
      p
      div(v-for="gift in gifts")
        router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
</template>
