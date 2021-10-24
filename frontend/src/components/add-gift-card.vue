<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddGiftCard',
  data() {
    return {
      name: '',
      category: '',
      location: '',
      address: '',
      description: '',
      photos: [],
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
          location: this.location,
          address: this.address,
          description: this.description,
          photos: this.photos,
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
    form( @submit="submitGift")
      h3 Add a new gift
      label(for="name") &nbsp;
        input(v-model="name" id="name" type="text" placeholder="Gift's name" required)
      label(for="category") &nbsp;
        //-input(v-model="category" id="category" type="text" placeholder="Category" required)
        select(v-model="category")
          option(disabled value="") Category
          option Electronics
          option Baby-Child
          option Living Area
          option Books
          option Furniture
          option Garten

      label(for="location")
        input(v-model="location" id="location" type="text" placeholder="Location" required)
        
        //- label(for="Outside") Outside &nbsp;
        //-   input(type="radio" id="one" value="Outside" v-model="picked")
        //- label(for="Inside") Inside &nbsp;
        //-   input(type="radio" id="two" value="Inside" v-model="picked")

        select(v-model="location")
          option(disabled value="") Location
          option Outside
          option Inside

      label(for="address") &nbsp;
        input(v-model="address" id="address" type="text" placeholder="Gift address" required)
      label(for="description") &nbsp;
        textarea(v-model="description" id="description" type="description" cols="40" rows="8" placeholder="Gift Description" required)
      label(for="photos") &nbsp;
        //- form(action="/photos" enctype="multipart/form-data" method="post")
        //-   div(class="form-group")
        //-     input(type="file" class="form-control-file" name="uploaded_file")
        //-     input(type="text" class="form-control" placeholder="Photo name" name="photoName")
        //-     input(type="submit" value="Upload" class="btn btn-default")

      input(type="submit" value="AddGift")

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
