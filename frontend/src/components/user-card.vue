<script>
export default {
  name: 'UserCard',
  props: ['user'],
  data() {
    return {}
  },
  computed: {
    img(){
      return this.user.photos.path
    }
  }
}
</script>

<template lang="pug">
.box
  div
    .row-1
      .col-5
        .photo-box(v-if="!user.photos")
          | no avatar
        .photo-box(v-else)
          img(:src="img" width="200px")
      .col-6
        .div
          h1 {{ user.name }} <br>
          h4  {{ user.email }}
        .div
          h4 gifts: 
          div(v-if="!user.present.length")
            | no gifts yet!
          div(v-else)
            .gift(v-for="gift in user.present")
              router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
        .div
          h4 takes: 
          div(v-if="!user.acceptThat.length")
            | no takes yet!
          div(v-else)
            .gift(v-for="gift in user.acceptThat")
              router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
        .div
          h4 comments: 
          div(v-if="!user.comments.length")
            | no comments yet!
          div(v-else)
            .gift(v-for="comment in user.comments")
              router-link(:to="`/gifts/${comment.gift._id}`") {{ comment.gift.name }}
</template>

