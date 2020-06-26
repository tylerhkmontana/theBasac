<template>
  <div>
    <h1>All</h1>
    <v-sheet 
      class="my-10 d-flex flex-column justify-space-evenly container" 
      max-width="100%" 
      color="white" 
      elevation="10" 
      height="400"
      v-for="category in getMenu"
      :key="category._id">
        <v-row>
          <v-col cols="11">
            <p class="text-center font-weight-bold my-auto">{{ category.categoryName }}</p>
          </v-col>
          <v-col class="hidden-xs-only d-flex flex-column justify-end" cols="1">
            <v-btn class="transparent" depressed :to="`/menu/${category._id}`">More</v-btn>
          </v-col>
        </v-row>
   
        <v-row>
          <v-slide-group show-arrows>
            <v-slide-item v-for="item in category.items" :key="item._id">
              <FoodCard 
                :foodInfo="item" 
                cardHeight="80%" 
                cardWidth="300" 
                imgHeight="170" />
            </v-slide-item>
          </v-slide-group>
        </v-row>
    </v-sheet>
  </div>
</template>

<script>
import FoodCard from '@/components/main/menus/FoodCard'
import menuService from '@/services/menu.service.js'

export default {
  data() {
    return {
      foodInfo: {
        imgSrc: "https://img.etoday.co.kr/pto_db/2019/02/20190208154354_1299168_600_372.JPG",
        name: "DIY Tukpokki",
        price: "19.99"
      },
      menu: null
    }
  },
  components: {
    FoodCard
  },
  computed: {
    getMenu() {
      return this.menu
    }
  },
  async created() {
    try {
      this.menu = (await menuService.getMenu()).data
    } catch(err) {
      console.log(err) // error handling web page may be provided
    }
  }
}
</script>

<style scoped>


</style>