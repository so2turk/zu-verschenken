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
  .ManageProfile(id="page-wrap")
    .row-2
      .col-3
        .photo-box(v-if="!user.photos")
          | no avatar
        .photo-box(v-else)
          img(:src="img" width="190px")
      .col-pro
        label Name: {{ user.name }} <br>
        label Email: {{ user.email }} <br>
        label Age: {{ 2021-user.birthYear }} <br>
        label Address: {{ user.address }} <br>
        label Postcode: {{ user.postcode }} <br>
</template>

<style lang="scss" scoped>
col-pro{
  flex-grow: 3;
  align-self: center;
  font-size: 22px;
  align-self: normal;
}
.div{
  font-size: 15px;
}
.grid-wrap {
  display: flex;
    flex-wrap: wrap;
    justify-content: space-araund;
    margin-top: 16px;
  }
// music {
//     list-style: lalala;
// }
// @counter-style lalala {
//   system: cyclic;
//   symbols: "♪" "♫" "♩" "♬";
//   suffix: " ";
// }
</style>
