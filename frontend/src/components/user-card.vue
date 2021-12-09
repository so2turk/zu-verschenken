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
    h4 gifts: 
    div(v-if="!user.present.length")
      | no gifts yet!
    div(v-else)
      .gift(v-for="gift in user.present")
        router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
    h4 takes: 
    div(v-if="!user.acceptThat.length")
      | no takes yet!
    div(v-else)
      .gift(v-for="gift in user.acceptThat")
        router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
    h4 comments: 
    div(v-if="!user.comments.length")
      | no comments yet!
    div(v-else)
      .gift(v-for="comment in user.comments")
        router-link(:to="`/gifts/${comment.gift._id}`") {{ comment.gift.name }}
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #c80;
  background-color: #dd0;
  border-radius: 0.3rem;
}
</style>
