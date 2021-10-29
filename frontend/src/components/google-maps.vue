<script>

export default ({
  name: "GoogleMaps",
  props: [ 'gift' ],
  data() {
    return {
      marker: {
        position: {
          lat: null,
          lng: null,
        },
        title: '',
      },
      center: { lat: null, lng: null },
      mapOptions: {
        disableDefaultUI: true,
      },
    }
  },
  mounted() {
    this.addMarker()
  },
  methods: {
    
    addMarker() {
      this.marker.position = { lat: this.gift.geolocation.lat, lng: this.gift.geolocation.lng }
      this.marker.title = this.gift.name
      this.center = this.marker.position //{ lat: this.marker.position.lat, lng: this.marker.position.lng }
      this.panToMarker()
    },

    // sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: parseFloat(e.latLng.lat()), lng: parseFloat(e.latLng.lng()) };
    },
   
    // Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(18);
    },

    handleMapClick() {
      window.open(`https://google.com/maps?q=${this.marker.position.lat},${this.marker.position.lng}`, '_blank')
    },

    // Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(18);
    },
  },
})
</script>

<template lang="pug">
  .GoogleMaps()
    GmapMap(:center="center" :zoom="12" style="width:450px;  height: 450px;" map-style-id="roadmap" :options="mapOptions" ref="mapRef" @click="handleMapClick") 
      GmapMarker(:position="marker.position" :clickable="true" :draggable="true" @drag="handleMarkerDrag" @click="panToMarker")
    
</template>
