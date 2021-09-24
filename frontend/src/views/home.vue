<script>
import axios from 'axios'
import UserCard from '@/components/user-card.vue'

export default {
  name: 'Home',
  components: {
    UserCard,
  },
  data() {
    return {
      mains: [],
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
    h1 Home
</template>
