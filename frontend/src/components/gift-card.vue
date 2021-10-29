<script>
import { mapState } from 'vuex'
import InterestedIn from '@/components/interested-in.vue'

export default {
  name: 'GiftCard',
  components: { InterestedIn },
  props: ['gift'],
  data() {
    return {}
  },
  computed: {
    ...mapState(["user"])
  }
}
</script>

<template lang="pug">
.box
  .div(v-if="gift")
    .row-2
      .col-2
        .photo-box(v-if="!gift.photos.length")
          | no photo
        .photo-box(v-else)
          | {{ gift.photos }}
        InterestedIn(v-if="user" :gift="gift")
      .col-2
        h2 {{ gift.name }}
        li category: {{ gift.category }}
        li description: {{ gift.description }}
        li address: {{ gift.address }}
        li location: {{ gift.location }}
        li presented by {{ gift.presentBy.name }} on {{ gift.presentDate }}
        li(v-if="!gift.interestBy.length")
          | interested by: -
        li(v-else)
          | interested by: {{ gift.interestBy.map(user => user.name).join(';\n') }}
        li status: {{ gift.giftStatus }}
        li accepted by: 
        li(v-if="!gift.acceptBy.length")
          | waiting for you..
        li(v-else)
          | router-link(:to="`/users/${gift.acceptBy.user._id}`") {{ gift.acceptBy.name }} on {{ gift.acceptDate }}
</template>

<style lang="scss" scoped>
.box {
  padding: 1rem;
  width: 800px;
  // border: 1px solid #c80;
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
  vertical-align: top;
}
.row-2 {
  //border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.col-1 {
  background: #dd5;
}
.col-2 {
  background: #dd5;
  flex-grow: 1;
  padding: 2px;
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
  width: 250px;
  background-color: green;
}
</style>
