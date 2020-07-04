<template>
  <v-container style="max-width: 1200px; min-height: 80vh;">
    <v-col>
      <div class="d-flex justify-space-between my-2">
        <h2 class="">Store Location</h2>
        <div class="d-flex flex-column align-end">
          <p class="mb-0" :style="`font-size: ${resFontSize}; text-align: right;`">158-09B Norther blvd, Flushing 11358</p>
          <v-chip tag="a" href="tel:7187628484" :style="`font-size: ${resFontSize};`" color="black" :small="resChipSize" outlined>
            <v-icon :size="resFontSize">mdi-phone</v-icon>&nbsp;718-762-8484
          </v-chip>
        </div>
      </div>

      <div style="height: 50vh">
        <!-- <div class="info" style="height: 15%">
          <span>Center: {{ center }}</span>
          <span>Zoom: {{ zoom }}</span>
          <span>Bounds: {{ bounds }}</span>
        </div> -->
        <l-map
          style="height: 100%; width: 100%"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng">
            <l-tooltip style="font-size:20px;">158-09B Norther blvd, Flushing 11358</l-tooltip>
          </l-marker>
        </l-map>
      </div>
    </v-col>
    <v-row class="d-flex justify-end pa-0" cols="6">
      <a class="mt-3 mr-3" href="https://www.ubereats.com/new-york/food-delivery/the-basac/QdEFfhT0S3qT6Mv2nuAeJA" target="_blank">
        <v-img src="@/assets/images/UberEats_Badge_Vertical.png" :width="resDeliveryButton.uber"></v-img> 
      </a>
      <a class="mt-3 mr-3" href="https://www.doordash.com/business/78603/?utm_source=partner-link&utm_medium=website&utm_campaign=78603&utm_content=red-xl" target="_blank" alt="Order Food Delivery with DoorDash" title="Order Food Delivery with DoorDash">
        <v-img src="https://cdn.doordash.com/media/button/button_red_xl.svg" :width="resDeliveryButton.doordash"></v-img>
      </a>
    </v-row>
  </v-container>
</template>

<script>
import {LMap, LTileLayer, LMarker, LTooltip} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 20,
      center: [40.763539, -73.806955],
      markerLatLng: [40.763539, -73.806955],
      bounds: null
    };
  },
  computed: {
    resFontSize() {
      return this.windowWidth < 700 ? '3.5vw' : '18px'
    },
    resChipSize() {
      return this.windowWidth < 700
    },
    resDeliveryButton() {
      if(this.windowWidth  < 700) {
        return {
          uber: '13vw',
          doordash: '30vw',
        }
      } else {
        return {
          uber: '75px',
          doordash: '165px',
        }
      }
    }
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    }
  }
}
</script>

<style scoped>

</style>