<script>
import { mapActions, mapState } from 'vuex'
import Search from '@/components/search.vue'

export default {
  name: 'App',
  components: { Search },
  methods: {
    ...mapActions(['logout', 'changeMode']),
    
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },

    switchMode(){
      this.changeMode()
      var element = document.body;
      if(this.dark) element.classList.toggle("dark-mode")
      else element.classList.toggle("dark-mode")
    }
  },
  computed: {
    ...mapState(["user", "dark"])
  }
}
</script>
<template lang="pug">
  #app
    .row-2
      .col-2
        router-link(to="/")
          img(v-if="dark" alt="zuV logo" width="100" src="../src/assets/logoBig-b.png")
          img(v-else alt="zuV logo" width="100" src="../src/assets/logoBig.png")        
      .col-2
        #nav
          router-link(to="/*") Home |&nbsp;
          router-link(to="/about") About |&nbsp;
          router-link(to="/browse-gift") Search Gifts <br>
          router-link(to="/profile" v-if="user") Profile |&nbsp;
          router-link(to="/login" v-if="!user") Login |&nbsp;
          router-link(to="/register" v-if="!user") Register |&nbsp;
          a(@click="doLogout" href="#" v-if="user") Logout <br>
          router-link(to="/users" v-if="user") Users |&nbsp;
          router-link(to="/user-list" v-if="user") User List |&nbsp;
          router-link(to="/manage-profile" v-if="user") Manage Profile <br>
          router-link(to="/gifts" v-if="user") Gifts |&nbsp;
          router-link(to="/gift-list" v-if="user") Gift List |&nbsp;
          router-link(to="/map" v-if="user") Map |&nbsp;
          router-link(to="/add-new-gift" v-if="user") Add New Gift
      .col-2
        Search
      .col-2
        div(v-if="!dark")
          img(@click="switchMode()" width="25px" src="https://d29fhpw069ctt2.cloudfront.net/icon/image/38007/preview.svg")
        div(v-else)
          img(@click="switchMode()" width="40px" src="https://d29fhpw069ctt2.cloudfront.net/icon/image/49197/preview.svg")
    router-view
    #footer 
      p
      p
      footer.footer 
        div 
          span.text-muted (c) SO 2021
</template>

<style lang="scss">
body {
  --text-color: #222;
  --bkg-color: #fff;
}
.dark-mode {
  --text-color: #eee;
  --bkg-color: #2b2626;
}
// system preferences
// @media (prefers-color-scheme: dark) {
//   /* defaults to dark theme */
//   body {
//     --text-color: #eee;
//     --bkg-color: #121212;
//   }
//   body.light-theme {
//     --text-color: #222;
//     --bkg-color: #fff;
//   }
// }

body { background: var(--bkg-color); }

h1,
p { color: var(--text-color); }

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
  padding: 3px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
