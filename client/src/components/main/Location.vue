<template>

  <v-container class="d-flex" style="max-width: 1200px;">
    <v-col>
      <div class="d-flex justify-space-between my-10">
        <h2 class="">Store Location</h2>
        <div class="d-flex flex-column align-end">
            <p class="mb-0" :style="`font-size: ${resFontSize}; text-align: right;`">158-09B Norther blvd, Flushing 11358</p>
            <v-chip tag="a" href="tel:7187628484" :style="`font-size: ${resFontSize};`" color="black" :small="resChipSize" outlined>
              <v-icon :size="resFontSize">mdi-phone</v-icon>&nbsp;718-762-8484
            </v-chip>
        </div>
      </div>

      <div style="height: 400px;">
        <!-- <div class="info" style="height: 15%">
          <span>Center: {{ center }}</span>
          <span>Zoom: {{ zoom }}</span>
          <span>Bounds: {{ bounds }}</span>
        </div> -->
        <l-map
          style="height: 80%; width: 100%"
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