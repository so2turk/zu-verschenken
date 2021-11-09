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
  #nav
    .row-1
      .col-1
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

      .col-6
        router-view
      .col-5
        p
        p
        <br><br>
        Search
    .row-3
      #footer
        footer.footer 
          div 
            span.text-muted (c) SO 2021
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: Arial;
}

a {
  text-decoration: none;
}

#page-wrap {
  margin: auto;
  max-width: 850px;
  min-height: 100vh;
}

#nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

}

.row-1 {
  display: flex;
  flex-grow: 1;
  margin: 2px;
  width: 100%;
  align-self: flex-start;
}
.col-1 {
  width: 100px;
  align-self: flex-start;
}
.col-2 {
  text-align: left;
  flex-grow: 3;
  font-size: 22px;
  flex-direction:row-reverse;
}
.col-3 {
  width: 200px;
  align-self: center;
  align-content:space-around
}
.col-4 {
  width: 40px;
  align-self: center;
}
.row-2 {
  display: flex;
  flex-grow: 1;
  margin: 2px;
  width: 100%;
}
.col-5 {
  align-self: stretch;
  font-size: 18px;
}
.col-6 {
  flex-grow: 3;
  align-self: center;
  font-size: 22px;
}

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

}

}

}


}
</style>
