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

      .col-3
      .col-4
        img(v-if="!dark" @click="switchMode()" width="30px" src="../src/assets/dark_moon.svg")
        img(v-else @click="switchMode()" width="30px" src="../src/assets/bright_moon.png")
    .row-2
      .col-5
        p
        p
        <br><br>
        .div(class="container")
          router-link(to="/*") 
            img(width=40 src="https://www.clipartmax.com/png/full/52-523723_home-house-location-place-icon-green-home-icon-png.png")
            .div(class="middle")
              .div(class="text") Home
        div(class="container")
          router-link(to="/about") 
            img(width=40 src="https://www.clipartmax.com/png/full/164-1649352_get-more-info-information-icon-green.png")
            .div(class="middle")
              .div(class="text") About
        div(class="container")
          router-link(to="/gifts") 
            img(width=50 src="https://www.clipartmax.com/png/full/1-12143_clipart-info-christmas-gift-clipart.png")
            .div(class="middle")
              .div(class="text") Gifs
        div(class="container")
          router-link(to="/map")
            img(width=35 src="https://www.clipartmax.com/png/full/17-170067_green-map-pin-png.png")
            .div(class="middle")
              .div(class="text") Browe Map
        div(class="container")
          router-link(to="/add-new-gift" v-if="user") 
            img(width=50 src="https://www.clipartmax.com/png/full/344-3447054_give-free-transparent-image-hd-giving-hand-icon-png.png")
            .div(class="middle")
              .div(class="text") Add New Gif      
        div(class="container")
          router-link(to="/profile" v-if="user")
            img(width=45 src="https://www.clipartmax.com/png/full/343-3436413_positive-icon-clipart-computer-icons-clip-art-green-profile-icon-png.png")
            .div(class="middle")
              .div(class="text") Profile
        .div(class="container")
          router-link(to="/login" v-if="!user")
            img(width=40 src="https://www.clipartmax.com/png/full/51-514952_user-login-icon-by-aha-soft-user-login-icon.png")
            .div(class="middle")
              .div(class="text") Login
        .div(class="container")
          router-link(to="/register" v-if="!user")
            img(width=40 src="https://www.clipartmax.com/png/full/81-819876_imd-register-icon-register-icon-green-png.png")
            .div(class="middle")
              .div(class="text") Register
        .div(class="container")
          a(@click="doLogout" href="#" v-if="user")
            img(width=40 src="https://www.clipartmax.com/png/full/147-1470587_logout-logout-icon-red-png.png")
            .div(class="middle")
              .div(class="text") Logout

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
  --bkg-color: #312727;
}
//system preferences
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

h1,h2,h3,h4,h5,a,label,.div-1,.div-2,.div-3,div,
p { color: var(--text-color); }

.middle {
  transition: .5s ease;
  opacity: 0;
  position: relative;
  left: 50%;
  transform: translate(-10%, -110%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container:hover .middle {
  opacity: 1;
}

.text {
  background-color: #04AA6D;
  color: white;
  font-size: 16px;
  padding: 16px 15px;
  border-radius: 6px;
}

.button {
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  vertical-align: middle;
}
.button2 {
  background-color: #db0707;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  vertical-align: middle;
}

.button:hover {
  background-color: #2c974b;
}

</style>
