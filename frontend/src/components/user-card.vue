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
  div
    .row-2
      .col-1
        .photo-box(v-if="!user.avatar")
          | no avatar
        .photo-box(v-else)
          | {{ user.avatar }}
      .col-2
        .row-3
          h1 {{ user.name }} <br>
          h5  ({{ user.email }})
        .row
          h4 gifts: 
          div(v-if="!user.present.length")
            | no gifts yet!
          div(v-else)
            .gift(v-for="gift in user.present")
              router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
        .row
          h4 takes: 
          div(v-if="!user.acceptThat.length")
            | no takes yet!
          div(v-else)
            .gift(v-for="gift in user.acceptThat")
              router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
        .row
          h4 comments: 
          div(v-if="!user.comments.length")
            | no comments yet!
          div(v-else)
            .gift(v-for="comment in user.comments")
              router-link(:to="`/gifts/${comment.gift._id}`") {{ comment.gift.name }}
</template>

<style lang="scss" scoped>
.box {
  padding: 1px;
  border: 1px solid #c80;
  background-color: #dd0;
  border-radius: 0.3rem;
  width: 800px;
}
.row-1 {
  height: 50px;
  // border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.row-2 {
  // border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.row-3 {
  // border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.col-1 {
  background: #dd5;
}
.col-2 {
  width: 250px;
  background: #dd5;
  flex-grow: 1;
  padding: 6px;
}
.gift-box {
  background-color: red;
  border: 1px solid white;
  border-radius: 8px;
  color: #dd4;
  padding: 8px;
}

.photo-box {
  height: 150px;
  width: 100px;
  background-color: green;
}

</style>
