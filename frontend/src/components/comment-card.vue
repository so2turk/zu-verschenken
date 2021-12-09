<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'CommentCard',
  data() {
    return {
      text: '',
      gift: {},
    }
  },
  async created() {
    this.gift = await this.fetchGift(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchGift', 'createComment']),
    
    async postComment(e) {
      console.log(this.user.name)
      try {
        await this.createComment({
          text: this.text,
          user: this.user,
          gift: this.gift,
          createdAt: new Date(),
        })
      } catch (e) {
        console.log(console.error((e).message))
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
.CommentCard
    h3 Post Comments
    form(@submit="postComment")
      
      p(v-if="!gift.comments.length")
        | would you like to be the first to comment?
      p(v-else)
        div(v-for="comment in gift.comments")
          li 
            router-link(:to="`/users/${comment.user._id}`") {{ comment.user.name }}
            | : {{ comment.text }} <br>
      p
      p(v-model="user" id="user")
      p
      textarea(v-model="text" id="text" type="text" cols="40" rows="8" placeholder="your comment" required)
      p
      input(type="submit" value="Post")
    p
    div Would like to send message instead? <router-link to="/pm">PM</router-link>
</template>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}
</style>
