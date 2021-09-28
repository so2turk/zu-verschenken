<script>
export default {
  data: { liked: false },
  methods: {
    like: function () {
      liked = !liked
    },
  },
}
</script>

<template lang="pug">
  .about
    h1 zu Verschenken
    p a platform to share what we don't need
    img(src="../assets/csm_Berlin-c-Shutterstock-2640_f98e087001.jpg")
    p(v-if="liked")
      img(v-on:click="like()" width=20 src="../assets/heart-green.png")
    P(v-else)
      img(v-on:click="like()" width=32 src="../assets/heart-black.png")

</template>
