<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(["user"])
  }
}
</script>

<template lang="pug">
  .home(id="page-wrap")
    h1 zu Verschenken
    p don't throw it away.. make someone happy..
    .row-home
      img(alt="zuV home" width=550 src="https://i.imgur.com/jJjvrSb.jpg")
      .col-home
        .col-home
          router-link(to="/gifts") 
            <button class="button" role="button">Search Gifts</button>
        .row-h1(v-if="user")
          router-link(to="/add-new-gift") 
            <button class="button" role="button">Add Gifts</button>
        .row-h1(v-else)
          router-link(to="/login") 
            <button class="button" role="button">Add Gifts</button>
</template>

<style lang="scss" scoped>
.row-home {
  display: flex;
  margin: 2px;
  width: 100%;
}
.col-home {
  padding: 1px 10px;
  display: flex;
  flex-direction:column;
  flex-grow: 1;
  font-size: 22px;
  align-content: flex-end;
}
.row-h1{
  flex-grow: 1;
  align-self: normal;
  padding: 1px 10px;
}
</style>
