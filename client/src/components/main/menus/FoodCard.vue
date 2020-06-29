<template>
  <!-- properties of foodinfo: cardHeight, cardWidth, imgSrc, imgHeight, foodName, price -->
  <v-card class="black--text ma-5 transparent" :height="cardHeight" :max-width="cardWidth" flat>
    <v-img 
    contain 
    :src="imgSrc || require('@/assets/images/no_image.png')"
    :height="imgHeight"></v-img>
    <div class="d-flex justify-space-between mt-2 " cols="4">
      <div cols="3">
        <p class="font-weight-bold ma-0 orange--text" :style="`font-size: ${resFontSize};`">{{ foodInfo.kName }}</p>
        <p class="ma-0" :style="`font-size: ${resSmallFontSize};`">{{ foodInfo.eName }}</p>
      </div>
      <div cols="1">
        <p :style="`font-size: ${resFontSize};`">${{ foodInfo.price }}</p>
      </div>
    </div>
    <!-- <v-card-title class="justify-center">{{ foodInfo.kName }}</v-card-title>
    <v-card-title class="justify-center">{{ foodInfo.eName }}</v-card-title>
    <v-card-subtitle class="text-center pa-0">${{ foodInfo.price }}</v-card-subtitle> -->
    <v-card-text class="text-center pa-1" :style="`font-size: ${resSmallFontSize}; line-height: 1em;`">{{ foodInfo.description ? `"${foodInfo.description}"` : "" }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    foodInfo: Object,
    cardHeight: String,
    cardWidth: String,
    imgHeight: String
  },
  computed: {
    imgSrc() {
      if(this.foodInfo.itemImage) {
        const { contentType, data } = this.foodInfo.itemImage

        // ** to convert string binary buffer to bson **
        // var binary = '';
        // var bytes = new Uint8Array( data );
        // var len = bytes.byteLength;
        // for (var i = 0; i < len; i++) {
        //     binary += String.fromCharCode( bytes[ i ] );
        // }

        return `data:${contentType};base64,` + data;
      } else {
        return null
      }
    },
    resFontSize() {
      if(this.windowWidth < 700) {
        return '3vw'
      } else {
        return '18px'
      }
    },
    resSmallFontSize() {
      if(this.windowWidth < 700) {
        return '2.5vw'
      } else {
        return '14px'
      }
    },
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>