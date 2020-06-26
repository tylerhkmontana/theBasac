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
          <v-col cols="12">
            <p class="text-center font-weight-bold my-auto">{{ category.categoryName }}</p>
          </v-col>
        </v-row>
   
        <v-row>
          <v-slide-group show-arrows>
            <v-slide-item v-for="item in category.items" :key="item._id">
              <FoodCard 
                :foodInfo="item" 
                cardHeight="80%" 
                cardWidth="280" 
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