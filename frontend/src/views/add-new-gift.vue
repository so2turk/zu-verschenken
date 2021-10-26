<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddGiftCard',
  data() {
    return {
      name: '',
      category: '',
      address: '',        // geolocation
      location: '',
      description: '',
      // photos: [],
    }
  },
  methods: {
    ...mapActions(['addGift']),
    
    async submitGift(e) {
      e.preventDefault()

      try {
        await this.addGift({
          name: this.name,
          category: this.category,
          address: this.address,
          location: this.location,
          description: this.description,
          // photos: this.photos,
          userId: this.user._id
        })
      } catch (e) {
        console.log(console.error((e).message))
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },

}
</script>

<template lang="pug">
.box
  div
    form(@submit.prevent="submitGift")
      p(v-if="!user.present")
        | no gift so far.. :(
      p(v-else)
        h4 So far you've presented {{ user.present.length }} gift(s). Please add more. 
        div(v-for="gift in user.present")
          li 
            router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
      <br>
      h3 Add a new gift
      p
      p(v-model="user" id="user")
      p
      label(for="name") &nbsp;
        input(v-model="name" id="name" type="text" placeholder="Gift's name" required)
      label(for="category") &nbsp;
        select(v-model="category")
          option(disabled value="") Category
          option Electronics
          option Baby-Child
          option Living Area
          option Books
          option Furniture
          option Garten
      label(for="address") &nbsp;
        input(v-model="address" id="address" type="text" placeholder="Gift address" required)
      label(for="location") &nbsp;
        select(v-model="location")
          option(disabled value="") Location
          option Outside
          option Inside
      label(for="description") &nbsp;
        textarea(v-model="description" id="description" type="description" cols="40" rows="8" placeholder="Gift Description" required)
      //- label(for="photos") &nbsp;
        //- form(action="/photos" enctype="multipart/form-data" method="post")
        //-   div(class="form-group")
        //-     input(type="file" class="form-control-file" name="uploaded_file")
        //-     input(type="text" class="form-control" placeholder="Photo name" name="photoName")
        //-     input(type="submit" value="Upload" class="btn btn-default")

      input(type="submit" value="Add Gift")

</template>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}

.box {
  padding: 1rem;
  border: 1px solid #c80;
  background-color: #dd0;
  border-radius: 0.3rem;
}
</style>
