<template>
  <!-- properties of foodinfo: cardHeight, cardWidth, imgSrc, imgHeight, foodName, price -->
  <v-card class="black--text ma-5" :height="cardHeight" :max-width="cardWidth" flat>
    <v-img 
    contain 
    class="transparent"
    :src="foodInfo.imgSrc" 
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