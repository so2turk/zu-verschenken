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
      // photos: [],
      marker: { position: { lat: null, lng: null } },
      center: { lat: 52.51981703975256, lng: 13.40479185199118 },
      mapOptions: {
        disableDefaultUI: true,
      },
    }
  },
  mounted() {
    this.geolocate();
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
          geolocation: this.marker.position,
          location: this.location,
          description: this.description,
          // photos: this.photos,
          userId: this.user._id
        })
      } catch (e) {
        console.log(console.error((e).message))
      }
    },
    
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
  },
  computed: {
    ...mapState(['user']),
  }
}
</script>

<template lang="pug">
.box
  div
    .row-2
      .col-2
        h3 Add a new gift
        p
        form(@submit.prevent="submitGift")
          
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
          label(for="geolocation") &nbsp;
            input(v-model="geolocation.lat" id="geoLat" type="text" placeholder="Latitude" required)
            input(v-model="geolocation.lng" id="geoLng" type="text" placeholder="Longitude" required)

          input(type="submit" value="Add Gift")
        p
        p(v-if="!user.present")
          | no gift so far.. :(
        p(v-else)
          h4 So far you've presented {{ user.present.length }} gift(s). <br>Please add more. 
          div(v-for="gift in user.present")
            li 
              router-link(:to="`/gifts/${gift._id}`") {{ gift.name }}
        
      .col-2
        GmapMap(:center="center" :zoom="10" style="width:450px;  height: 100%;" map-style-id="roadmap" :options="mapOptions" ref="mapRef" @click="handleMapClick") 
          GmapMarker(:position="marker.position" :clickable="true" :draggable="true" @drag="handleMarkerDrag" @click="panToMarker")
</template>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}

.box {
  padding: 1rem;
  width: 800px;
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
</style>
