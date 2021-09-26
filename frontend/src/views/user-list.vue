<script>
import axios from 'axios'
import Counter from '@/components/counter.vue'
import { mapActions } from 'vuex'

export default {
  name: 'UserList',
  components: { Counter },
  data() {
    return {
      mains: [],
      time: new Date(),
    }
  },
  async created() {
    this.mains = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers']),
  },
}
</script>

<template lang="pug">
  .UserList
    h1 User detail
    p The time is: {{ time }}
    div(v-for="main in mains")
      router-link(:to="`/mains/${main._id}`") {{ main.name }}
    Counter
</template>
