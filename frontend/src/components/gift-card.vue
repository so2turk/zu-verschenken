<script>
export default {
  name: 'GiftCard',
  props: ['gift'],
  data() {
    return {}
  },
}
</script>

<template lang="pug">
.GiftCard
  .div
    .row-1
      h2 {{ gift.name }}
    .row-2
      .col-1
        .photo-box(v-if="!gift.photos.length")
          | no photo
        .photo-box(v-else)
          | {{ gift.photos }}
      .col-2
        p category: {{ gift.category }}
        p description: {{ gift.description }}
        p address: {{ gift.address }}
        p location: {{ gift.location }}
        p presented by {{ gift.presentBy.name }} on {{ gift.presentDate }}
        p(v-if="!gift.interestBy.length")
          | interested by: -
        p(v-else)
          | interested by: {{ gift.interestBy.map(user => user.name).join('\n') }}
        p(v-if="!gift.commentBy.length")
          | comment by: -
        p(v-else)
          | comment by: <br> {{ gift.commentBy.map(user => `\* ${user.comentingUser.name}: ${user.comment}`).join('\n') }}
        p status: {{ gift.giftStatus }}
        p accepted by: {{ gift.acceptBy.name}} on {{ gift.acceptDate }}
</template>

<style lang="scss" scoped>
.row-1 {
  height: 50px;
  border: 1px solid #c80;
  display: flex;
  flex-grow: 1;
  background-color: #dd5;
  margin: 2px;
}
.row-2 {
  border: 1px solid #c80;
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
  width: 250px;
  background-color: green;
}
</style>
