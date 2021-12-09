<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'CommentCard',
  props: [
    "gift"
  ],
  data() {
    return {
      text: '',
    }
  },
  methods: {
    ...mapActions(['createComment']),
    
    async postComment(e) {
      console.log(this.user.name)
      try {
        await this.createComment({
          text: this.text,
          user: this.user,
          gift: this.gift,
          createdAt: new Date(),
        })
        this.$emit("addComment")
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
  .row-2
    .col-5
      h3 Post Comments
      form(@submit.prevent="postComment")
        
        
        p(v-model="user" id="user")
        p
        textarea(v-model="text" id="text" type="text" cols="40" rows="8" placeholder="your comment" required)
        p
        input(type="submit" value="Post")
      p
    .col-pro
      p(v-if="!gift.comments")
        | would you like to be the first to comment?
      p(v-else)
        div(v-for="comment in gift.comments")
          li 
            | {{ comment.user.name }}
            | : {{ comment.text }} <br>
      p
</template>

<style lang="scss" scoped>
  .col-pro{
    display: flex;
    flex-grow: 3;
    font-size: 22px;
    align-self: flex-start;
    padding: 10px 20px;
    flex-direction: column;
  }
  .div-2{
    display: flex;
    font-size: 12px;
    flex-direction: columns;
    align-content:space-between;
  }
  .div-1{
    font-size: 30px;
  }
</style>
