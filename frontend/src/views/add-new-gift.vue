<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddGiftCard',
  data() {
    return {
      name: '',
      category: '',
      address: '',
      location: '',
      description: '',
      geolocation: { lat: null, lng: null },
      marker: { position: { lat: null, lng: null } },
      center: { lat: 52.51981703975256, lng: 13.40479185199118 },
      mapOptions: {
        disableDefaultUI: true,
      },
      file: null,
      filename: null,
      path: null,
      imgId: null,
      del: null
    }
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    ...mapActions(['addGift', 'addGiftPhoto']),
    
    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.geolocation=this.marker.position
        this.panToMarker();
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.geolocation=this.marker.position
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(18);
      this.geolocation=this.marker.position
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.geolocation=this.marker.position
      console.log(e)
      console.log(typeof(this.geoLat), typeof(this.geolocation.lat))
    },

    selectImage(event){
      this.file = event.target.files[0]
    },

    async sendImage() {
      if(this.file){
        console.log(this.file.name)
        let formData = new FormData()
        const ID = ''
        formData.append('image',this.file)
        console.log(formData, this.file, 'lol')
  
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
        console.log(this.path)
        
        try {
          await this.addGiftPhoto({
            name: this.name,
            category: this.category,
            address: this.address,
            geolocation: this.marker.position,
            location: this.location,
            description: this.description,
            userId: this.user._id,
            filename: this.file.name,
            path: this.path,
            imgId: this.imgId,
            del: this.del
          })
        } catch (e) {
          console.log(console.error((e).message))
        }

      }else{
        try {
          await this.addGift({
            name: this.name,
            category: this.category,
            address: this.address,
            geolocation: this.marker.position,
            location: this.location,
            description: this.description,
            userId: this.user._id
          })
        } catch (e) {
          console.log(console.error((e).message))
        }
      }
    },
  },
  computed: {
    ...mapState(['user']),
  }
}
</script>

<template lang="pug">
.box(id="page-wrap")
  div
    .row-2
      .col-2
        h3 Add a new gift
        p
        //- form(@submit="submitGift")
        form(id="form" enctype="multipart/form-data")
          
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
              option Others
          label(for="location") &nbsp;
            select(v-model="location")
              option(disabled value="") Location
              option Outside
              option Inside
          label(for="description") &nbsp;
            textarea(v-model="description" id="description" type="description" cols="40" rows="8" placeholder="Gift Description" required)
          label(for="geolocation") &nbsp;
            input(v-model="geolocation.lat" id="geoLat" type="text" placeholder="Latitude" required)
            input(v-model="geolocation.lng" id="geoLng" type="text" placeholder="Longitude" required)

          input(id='file' type="file" name="avatar" @change="selectImage( $event )")
          <br>
          <button name="data" class="button3" @click="sendImage()">Upload</button>
      .col
        GmapMap(:center="center" :zoom="10" style="width:450px;  height: 100%;" map-style-id="roadmap" :options="mapOptions" ref="mapRef" @click="handleMapClick") 
          GmapMarker(:position="marker.position" :clickable="true" :draggable="true" @drag="handleMarkerDrag" @click="panToMarker")
</template>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}
.row-1 {
  height: 50px;
  display: flex;
  flex-grow: 1;
  margin: 2px;
}
.row-2 {
  display: flex;
  flex-grow: 1;
  margin: 2px;
}
.col-2 {
  flex-grow: 1;
  padding: 2px;
}
</style>
