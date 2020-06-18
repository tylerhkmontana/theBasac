<template>
    <v-card flat class="jutify-center" width="100%">
   
      <v-card-title class="justify-center text-center web-title">
        <span class="font-weight-normal">The</span>
        <span class="orange--text font-weight-bold">Basac</span>
      </v-card-title>


      <v-tabs color="orange" background-color="transparent" light centered grow>
          <v-tab class="black--text font-weight-bold" to="/">Home</v-tab>
          <v-tab class="black--text font-weight-bold" to="/menu">Menu</v-tab>
          <v-tab class="black--text font-weight-bold" to="/location">Location</v-tab>
        </v-tabs> 
    </v-card>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
  * {
  font-family: 'Indie Flower', cursive;
  }
  .web-title {
    font-size: 40px;
    height: 100px;
  }
</style>