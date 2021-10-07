<script>
export default {
  data() {
    return { interested: false, countt: 0 }
  },
  methods: {
    showInterest: function () {
      this.interested = !this.interested
      this.countt++
    },
  },
}
</script>

<template lang="pug">
  .InterestedIn
    p(v-if="interested")
      img(width=20 src="../assets/heart-green.png") 
      |  {{ countt }}
    P(v-else)
      img(v-on:click="showInterest()" width=20 src="../assets/heart-black.png")

</template>
