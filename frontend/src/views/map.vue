<script>
import { mapActions } from 'vuex'

export default ({
  name: "Maps",
  data() {
    return {
      gifts: [],
      giftsGeolocations: [],
      center: { lat: 52.5203729, lng: 13.4050274 },
      mapOptions: {
        disableDefaultUI: true,
      },
      infoPosition: null,
      infoContent: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        },
        maxWidth: 300,
        content: null
      },
    }
  },
  async created() {
    this.gifts = await this.fetchGifts()
    this.addGiftGeolocations()
  },
  methods: {
    ...mapActions(['fetchGifts']),

    addGiftGeolocations() {
      for(let i=0; i < this.gifts.length; i++){
        this.giftsGeolocations.push({
          lat: this.gifts[i].geolocation.lat,
          lng: this.gifts[i].geolocation.lng,
          name: this.gifts[i].name,
          photos: this.gifts[i].photos,
          category: this.gifts[i].category,
          id: this.gifts[i]._id,
        })
      }
    },
    getPosition: function(gift) {
      return {
        lat: gift.lat,
        lng: gift.lng
      }
    },
    toggleInfo: function(item, key) {
      this.infoPosition = this.getPosition(item);
      this.infoOptions.content =  '<a href="/gifts/' + item.id + '">' + 
                                    '<div>'+     
                                      '<div>'+
                                        '<img v-if="item.photos[0].path" src="' + item.photos[0].path +'" width="280px" alt="">'+
                                      '</div>'+                               
                                      '<div>'+                                     
                                        '<div>'+
                                          '<h2>'+
                                            item.name +
                                          '</h2>'+
                                        '</div>'+
                                        '<h4>'+
                                          item.category +
                                        '</h4>'+
                                      '</div>'+       
                                    '</div>' + 
                                  '</a>';
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
    }
  },
  computed:{
    
  }
})
</script>

<template lang="pug">
  .GoogleMaps(id="page-wrap")
    GmapMap(:center="center" :zoom="12" style="width:900px;  height: 850px;" map-style-id="roadmap" :options="mapOptions") 
      GmapInfoWindow(:options="infoOptions" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false")
      GmapMarker(v-for="(item, key) in giftsGeolocations" :key="key" :position="getPosition(item)" :clickable="true" @click="toggleInfo(item, key)")

</template>
