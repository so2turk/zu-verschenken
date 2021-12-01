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
  .div(v-if="gift" class="gift-item")
    p(class="gift-name") {{ gift.name }}
    router-link(v-bind:to="'/gifts/' + gift._id")
      <button class="button">View Details</button>
    InterestedIn(v-if="user" :gift="gift")
</template>

<style lang="scss" scoped>
  .gift-item {
    align-items: center;
    border-radius: 8px;
    box-shadow: 1px 2px 5px rgb(1, 143, 31);
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 20px;
    position: relative;
    width: 90%;
  }

  .gift-name {
    margin-bottom: 0;
  }

  img {
    height: 200px;
    width: 200px;
  }
</style>
