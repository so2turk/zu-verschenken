<script>
import UserCard from '@/components/user-card.vue'
import Counter from '@/components/counter.vue'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  components: { Counter, UserCard },
  data() {
    return {
      users: [],
      time: new Date(),
      message: '',
    }
  },
  async created() {
    this.users = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers', 'goLive', 'sendMessageToLiveStream', 'joinStream']),
    sendMessage(e) {
      e.preventDefault()
      this.sendMessageToLiveStream(this.message)
      this.message = ''
    },
  },
  computed: {
    ...mapState(['currentLiveStream', 'liveStreams', 'user', 'liveStreamMessages']),
  },
}
</script>

<template lang="pug">
  .home
    .box
      .div
        .row-2
          .col-2
            UserCard(:user="user" v-if="user")
        .row-3
          p The time is: {{ time }}
          div(v-if="liveStreams.length")
            h2 Live streams
            div(v-for="stream in liveStreams")
              p {{ stream }}
              button(@click="joinStream(stream)") Join stream
          button(@click="goLive") Go live
          div(v-if="currentLiveStream")
            h3 Live stream
            .messages
              .message(v-for="message in liveStreamMessages")
                p
                  span {{ message.author }}:&nbsp;
                  span {{ message.body }}
            form(@submit="sendMessage")
              input(type="text" v-model="message")
              input(type="submit" value="Send message")
</template>


<style lang="scss" scoped>
.row-1 {
  height: 90%; 
  width:100%;
  display:flex;
  align-items: center;
  // justify-content: center;
}
.row-1 {
  height: 50px;
  border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.row-2 {
  border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.col-1 {
  background: #dd5;
}
.col-2 {
  background: #dd5;
  flex-grow: 1;
  padding: 1px;
}

</style>
