<script>
import axios from 'axios'
import UserCard from '@/components/user-card.vue'

export default {
  name: 'Users',
  components: { UserCard },
  data() {
    return {
      users: [],
    }
  },
  async created() {
    const usersRequest = await axios.get('/api/users')
    this.users = usersRequest.data
  },
}
</script>

<template lang="pug">
  .users
    h1 Users
    user-card(v-for="user in users" :user="user" :key="user._id")
</template>
