<template>
  <div class="home">
    <v-container class="elevation-10 white--text mt-10" style="background-color: #D0E5CD; border-radius: 15px;">
      <v-row class="my-5" justify="center">
        <h1>Popular Menu!</h1>

      </v-row>

      <v-row no-gutters justify="space-around">
        <v-card class="white--text" height="300px" flat color="transparent">
        <v-img 
        aspect-ratio="1" 
        contain
        class="transparent" 
        src="https://img-cf.kurly.com/shop/data/goodsview/20181203/gv10000037370_1.jpg" 
        width="200"></v-img>
        <v-card-title>Cheese Pork Cutlet</v-card-title>
        <v-card-subtitle class="white--text">$15.99</v-card-subtitle>
      </v-card>

      <v-card class="white--text" height="300px" flat color="transparent">
        <v-img 
        aspect-ratio="1" 
        contain
        class="transparent" 
        src="https://cdn.imweb.me/upload/S201811205bf3901253bba/ce984500f2362.jpg" 
        width="200"></v-img>
        <v-card-title>Curry Pork Cutlet</v-card-title>
        <v-card-subtitle class="white--text">$13.99</v-card-subtitle>
      </v-card>

      <v-card class="white--text" height="300px" flat color="transparent">
        <v-img 
        aspect-ratio="1" 
        contain
        class="transparent" 
        src="https://dispatch.cdnser.be/wp-content/uploads/2018/09/20180926145512_007.jpg" 
        width="200"></v-img>
        <v-card-title>Corndogs</v-card-title>
        <v-card-subtitle class="white--text">$4.00-$6.00</v-card-subtitle>
      </v-card>

      <v-card class="white--text" height="300px" flat color="transparent">
        <v-img 
        aspect-ratio="1" 
        contain
        class="transparent" 
        src="https://img.etoday.co.kr/pto_db/2019/02/20190208154354_1299168_600_372.JPG" 
        width="200"></v-img>
        <v-card-title>DIY Tukppoki</v-card-title>
        <v-card-subtitle class="white--text">$19.99</v-card-subtitle>
      </v-card>

      <v-card class="white--text" height="300px" flat color="transparent">
        <v-img 
        aspect-ratio="1" 
        contain
        class="transparent" 
        src="https://cdn.shopify.com/s/files/1/1071/7482/products/3075523072.jpg?v=1488472297" 
        width="200"></v-img>
        <v-card-title>Buckwheat Noodle</v-card-title>
        <v-card-subtitle class="white--text">$11.99</v-card-subtitle>
      </v-card>
      </v-row>

      <v-row justify="end">
        <v-btn class="white--text transparent mr-5" depressed to="/menu">Go to menu <v-icon>mdi-arrow-right-bold</v-icon></v-btn>      
      </v-row>
      
    </v-container>     
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.first-pannel {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}
</style>