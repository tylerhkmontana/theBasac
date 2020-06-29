<template>
  <div>
    <h2> All</h2>
    <v-sheet 
      class="my-5 d-flex flex-column justify-space-evenly container" 
      max-width="100%" 
      color="light-green lighten-5" 
      elevation="3"
      height="auto"
      v-for="category in getMenu"
      :key="category._id">
        <v-row>
          <v-col class="pa-0" cols="12">
            <p class="text-center font-weight-bold my-auto">
              <v-icon class="pb-1" color="black">mdi-check</v-icon> 
              {{ category.categoryName }}
            </p>
          </v-col>
        </v-row>
   
        <v-row>
          <v-slide-group show-arrows>
            <v-slide-item v-for="item in category.items" :key="item._id">
              <FoodCard 
                :foodInfo="item" 
                cardHeight="100%" 
                :cardWidth="resFoodCardWidth" 
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
    },
    resFoodCardWidth() {
      if(this.windowWidth < 700) {
        return '50vw'
      } else {
        return '280'
      }
    },
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