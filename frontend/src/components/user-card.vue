<script>
export default {
  name: 'UserCard',
  props: ['main'],
  data() {
    return {
      defaultBio: 'This user has no bios.',
    }
  },
}
</script>

<template lang="pug">
.box
    h3 {{ main.name }} ({{ main.email }})
    p presents: {{ main.present.length }}
    p accepts: {{ main.acceptThat.length }}

    .gift(v-for="gift in main.present")
        h3 {{ gift.name }}
        p(v-if="!gift.interestBy.length")
            | no likes yet!
        p(v-else)
            | {{ gift.interestBy.map(main => main.name).join(', ') }}
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #c80;
  background-color: #dd0;
}
</style>
