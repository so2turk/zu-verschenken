<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
  computed: {
    ...mapState(["user"])
  }
}
</script>
<template lang="pug">
  #app
    img(alt="zuV logo" src="../src/assets/logo.png")
    #nav
      router-link(to="/") Home |&nbsp;
      router-link(to="/about") About |&nbsp;
      router-link(to="/browse-gift") Search Gifts <br>
      router-link(to="/profile" v-if="user") Profile |&nbsp;
      router-link(to="/login" v-if="!user") Login |&nbsp;
      router-link(to="/register" v-if="!user") Register |&nbsp;
      a(@click="doLogout" href="#" v-if="user") Logout <br>
      router-link(to="/users" v-if="user") Users |&nbsp;
      router-link(to="/user-list" v-if="user") User List |&nbsp;
      router-link(to="/gifts" v-if="user") Gifts |&nbsp;
      router-link(to="/gift-list" v-if="user") Gift List |&nbsp;
      router-link(to="/manage-profile" v-if="user") Manage Profile |&nbsp;
      router-link(to="/add-new-gift" v-if="user") Add New Gift
    router-view
    #footer 
      p
      p
      footer.footer 
        div 
          span.text-muted (c) SO 2021
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  align-content: center;
}

.col-2 {
  flex-grow: 1;
  padding: 2px;
}

.row-2 {
  //border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  margin: 2px;
  width: 800px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
