<script>
import axios from 'axios'
import UserCard from '@/components/user-card.vue'

export default {
  name: 'Users',
  components: {
    UserCard,
  },
  data() {
    return {
      mains: [],
      gifts: [],
    }
  },
  async created() {
    const usersRequest = await axios.get('/api/mains')

    this.mains = usersRequest.data
  },
}
</script>

<template lang="pug">
  .home
    h1 Users
    user-card(v-for="main in mains" :main="main")
</template>
