<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Manage-Profile',
  data() {
    return { }
  },
  methods: {
    ...mapActions(['addAvatar']),
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
.ManageProfile
  .box
    .row-2
      .col-1
        .photo-box(v-if="!user.avatar")
          | no avatar
        .photo-box(v-else)
          | {{ user.avatar }}
      .col-2
        label
          li Name: {{ user.name }}
          li Email: {{ user.email }}
          li Age: {{ 2021-user.birthYear }}
          li Address: {{ user.address }}
          li Postcode: {{ user.postcode }}

    form(id='form' method="post" enctype="multipart/form-data")
      input(id='file' type="file" name="avatar")
      input(type="submit" class="btn btn-default")
</template>

<style lang="scss" scoped>
.box {
  width: 600px;
  padding: 1px;
  border: 1px solid #c80;
  background-color: #dd0;
  border-radius: 0.3rem;
}
.row-1 {
  height: 50px;
  // border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.row-2 {
  // border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.row-3 {
  // border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.col-1 {
  background: #dd5;
}
.col-2 {
  width: 250px;
  background: #dd5;
  flex-grow: 1;
  padding: 6px;
}
.gift-box {
  background-color: red;
  border: 1px solid white;
  border-radius: 8px;
  color: #dd4;
  padding: 8px;
}

.photo-box {
  height: 150px;
  width: 100px;
  background-color: green;
}

music {
    list-style: lalala;
}

@counter-style lalala {
  system: cyclic;
  symbols: "♪" "♫" "♩" "♬";
  suffix: " ";
}

</style>
