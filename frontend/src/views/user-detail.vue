<script>
import axios from 'axios'
import Counter from '@/components/counter.vue'
import UserCard from '@/components/user-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'UserDetail',
  components: { UserCard, Counter },
  data() {
    return {
      main: {},
    }
  },
  async created() {
    this.main = await this.fetchUser(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchUser']),
  },
}
</script>
<template lang="pug">
  .UserDetail
    h1 This is an user detail
    UserCard(:main="main")
    Counter
</template>
