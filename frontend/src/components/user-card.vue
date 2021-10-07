<script>
export default {
  name: 'UserCard',
  props: ['user'],
  data() {
    return {}
  },
}
</script>

<template lang="pug">
.box
    h3 {{ user.name }} ({{ user.email }})
    p presents: {{ user.present.length }}
    p accepts: {{ user.acceptThat.length }}

    .gift(v-for="gift in user.present")
        h3 {{ gift.name }}
        p(v-if="!gift.interestBy.length")
            | no likes yet!
        p(v-else)
            | {{ gift.interestBy.map(user => user.name).join(', ') }}
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #c80;
  background-color: #dd0;
  border-radius: 0.3rem;
}
</style>
