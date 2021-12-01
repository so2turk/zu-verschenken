<script>
import { mapActions, mapState } from 'vuex'
import InterestedIn from '@/components/interested-in.vue'
import GoogleMaps from '@/components/google-maps.vue'

export default {
  name: 'GiftDetailCard',
  components: { InterestedIn, GoogleMaps },
  props: ['gift'],
  data() {
    return {
      file: null,
      filename: null,
      path: null,
      imgId: null,
      del: null,
      gone: false,
     }
  },
  created(){
      this.gone = this.gift.acceptBy!=0
  },
  methods:{
    ...mapActions(['addPhoto', 'take', 'delGift', 'leave']),

    direct(){
      this.$router.push({ path : '/profile' })
    },
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
          giftId: this.gift._id,
          filename: this.file.name,
          path: this.path,
          imgId: this.imgId,
          del: this.del
        })
      } catch (e) {
        console.log(console.error((e).message))
      }
      this.$emit("anyChange")
    }
  },
  computed: {
    ...mapState(["user"]),

    img(){
      return this.gift.photos[0].path
    }
  }
}
</script>

<template lang="pug">
.GiftDetailCard
  .div(v-if="gift")
    .row-g
      .col-g1
        .div-1 {{ gift.name }} <br>
        .div-2 by: {{ gift.presentBy.name }} on {{ gift.presentDate }}
      .col-g2
        .div-3 {{ gift.category }}
      .col-g1
        .div(v-if="user")
          .div-2(v-if="user.present.some(presentedGift => presentedGift._id == gift._id)")
            .div(v-if="gone")
              <button class="button2">Gone</button>
            img(width=30 src="../assets/delete.png" @click="delGift({ giftId: gift._id })")
          .div(v-else)
            .div(v-if="!gone")
              <button class="button" @click="take({ giftId: gift._id, userId: user._id }); gone = !gone">Take</button>
            .div(v-else)
              <button v-if="!user.acceptThat.some(g => g._id == gift._id)"class="button2">Gone</button>
              <button v-if="user.acceptThat.some(g => g._id == gift._id)" class="button2" @click="leave({ giftId: gift._id, userId: user._id }); gone = !gone">Left</button>
    <hr>
    .row-1
      .col-5
        .photo-box(v-if="!gift.photos.length")
          img(v-if="dark" alt="zuV logo" width="300" src="../assets/logoBig-b.png")
          img(v-else alt="zuV logo" width="300" src="../assets/logoBig.png")
        .photo-box(v-else)
          img(:src="img" width="300px")
        InterestedIn(:gift="gift")
        .div(v-if="user")
          .div(v-if="user.present.some(presentedGift => presentedGift._id == gift._id)")
            .div(v-if="!gift.photos.length")
              form(@submit.prevent="sendImage" id="form" enctype="multipart/form-data")
                input(id='file' type="file" name="avatar" @change="selectImage( $event )")
                <br>
                input(type="submit" class="btn btn-default")
      .col-pro
        GoogleMaps(:gift="gift" v-if="gift")
    <hr>
    .div-4 {{ gift.description }}
    <br>
</template>

<style lang="scss">
button {
  background-color: #c90808;
}
.row-g {
  display: flex;
  flex-grow: 1;
  margin: 2px;
  width: 100%;
}
.col-g1 {
  align-self: stretch;
  align-self: flex-end;
  font-size: 18px;
}
.col-g2 {
  flex-grow: 3;
  justify-items: center;
  align-self: flex-end;
}
  .col-pro{
    display: flex;
    flex-grow: 3;
    font-size: 22px;
    align-self: flex-start;
    padding: 10px 20px;
    flex-direction: column;
  }
  .div-2{
    display: flex;
    font-size: 12px;
    flex-direction: columns;
  }
  .div-1{
    font-size: 30px;
  }
  .div-3{
    text-align: center;
    font-size: 14px;
  }
  .div-4{
    display: flex;
    font-size: 14px;
    flex-direction: columns;
  }
</style>
