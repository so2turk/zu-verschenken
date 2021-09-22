<template lang="pug">
  .home
    img(alt="Vue logo" src="../assets/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js App")
    div(v-for="main in mains") {{ main.name }} has {{ main.present.length }} gifts
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld,
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
