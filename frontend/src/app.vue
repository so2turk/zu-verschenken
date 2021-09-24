<template lang="pug">
  #app
    img(alt="zuV logo" src="../src/assets/logo.png")
    #nav
      router-link(to="/") Home |&nbsp;
      router-link(to="/about") About |&nbsp;
      router-link(to="/users") Users |&nbsp;
      router-link(to="/gifts") Gifts
    router-view
    #footer 
      p
      p
      footer.footer 
        container 
          span.text-muted (c) SO 2021
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
