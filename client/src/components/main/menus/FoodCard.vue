<template>
  <!-- properties of foodinfo: cardHeight, cardWidth, imgSrc, imgHeight, foodName, price -->
  <v-card class="black--text ma-5 transparent" :height="cardHeight" :max-width="cardWidth" flat>
    <v-img 
    contain 
    :src="foodInfo.imgSrc || require('@/assets/images/no_image.png')"
    :height="imgHeight"></v-img>
    <v-card-title class="justify-center">{{ foodInfo.name }}</v-card-title>
    <v-card-subtitle class="text-center">${{ foodInfo.price }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    foodInfo: Object,
    cardHeight: String,
    cardWidth: String,
    imgHeight: String
  }
}
</script>

<style scoped>

</style>