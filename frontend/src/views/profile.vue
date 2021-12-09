<script>
import { mapActions, mapState } from 'vuex'
import GiftCard from '@/components/gift-card.vue'

export default {
  name: 'Manage-Profile',
  components: { GiftCard },
  data() {
    return { 
      file: null,
      filename: null,
      path: null,
      imgId: null,
      del: null
    }
  },
  methods: {
    ...mapActions(['addAvatar', 'delAvatar']),
    
    selectImage(event){
      this.file = event.target.files[0]
    },
    async sendImage() {
      let formData = new FormData()
      const ID = ''
      formData.append('image',this.file)

      await fetch("https://api.imgur.com/3/image/",{
        method: "post",
	      headers: {
		      Authorization: `Client-ID ${ID}`
        }, 
        body: formData
      }).then(data => data.json()).then(data => {
        this.path=data.data.link,
        this.imgId=data.data.id,
        this.del=data.data.deletehash
      }).then(data => console.log(data))
      
      try {
        await this.addAvatar({
          userId: this.user._id,
          filename: this.file.name,
          path: this.path,
          imgId: this.imgId,
          del: this.del
        })
      } catch (e) {
        console.log(console.error((e).message))
      }
      
    }
  },
  computed: {
    ...mapState(['user']),
    img(){
      return this.user.photos.path
    }
  },
}
</script>


<template lang="pug">
  .ManageProfile(id="page-wrap")
    .row-2
      .col-3
        .photo-box(v-if="!user.photos")
          | no avatar
        .photo-box(v-else)
          img(:src="img" width="190px")
      .col-pro
        label Name: {{ user.name }} <br>
        label Email: {{ user.email }} <br>
        label Age: {{ 2021-user.birthYear }} <br>
        label Address: {{ user.address }} <br>
        label Postcode: {{ user.postcode }} <br>
    .row-2(v-if="!user.photos")
      form(id="form" enctype="multipart/form-data")
        input(id='file' type="file" name="avatar" @change="selectImage( $event )")
        <br>
        input(type="submit" class="btn btn-default" @click="sendImage()" )
    .row-2(v-else)
      img(width=20 src="../assets/delete.png" @click="delAvatar({ userId: user._id })")
    <hr/>
    <br>
    .div1(id="page-wrap")
      h3 Your Presents
      .div(v-if="user.present.length!=0" class="grid-wrap")
        GiftCard(v-for="gift in user.present" :gift="gift" :key="gift._id")
      .div(v-else) none so far..
      h3 Your Gifts
      .div(v-if="user.acceptThat.length!=0" class="grid-wrap")
        GiftCard(v-for="gift in user.acceptThat" :gift="gift" :key="gift._id")
      .div(v-else) none so far..
</template>

<style lang="scss" scoped>
col-pro{
  flex-grow: 3;
  align-self: center;
  font-size: 22px;
  align-self: normal;
}
.div{
  font-size: 15px;
}
.grid-wrap {
  display: flex;
    flex-wrap: wrap;
    justify-content: space-araund;
    margin-top: 16px;
  }
// music {
//     list-style: lalala;
// }
// @counter-style lalala {
//   system: cyclic;
//   symbols: "♪" "♫" "♩" "♬";
//   suffix: " ";
// }
</style>
