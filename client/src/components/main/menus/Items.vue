<template>
  <div>
    <h2><v-icon class="pb-1" color="black">mdi-check</v-icon> {{ this.currCategory }}</h2>
    <v-col cols="12">
      <v-row> 
        <v-col class="d-flex justify-center" :cols="resColSize" v-for="item in currItems" :key="item._id" >
          <FoodCard 
          cardHeight="70%" 
          :cardWidth="resFoodCardWidth" 
          imgHeight="200" 
          :foodInfo="item"/>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import menuService from '@/services/menu.service.js'
import FoodCard from '@/components/main/menus/FoodCard'

export default {
  data() {
    return {
      categoryName: '',
      items: []
    }
  },
  components: {
    FoodCard
  },
  computed: {
    currCategory () {
      return this.categoryName
    },
    currItems() {
      return this.items
    },
    resFoodCardWidth() {
      if(this.windowWidth < 700) {
        return '60vw'
      } else {
        return '280'
      }
    },
    resColSize() {
      if(this.windowWidth < 700) {
        return 12
      } else if(this.windowWidth > 700 && this.windowWidth < 1000) {
        return 6
      } else if(this.windowWidth < 1350 && this.windowWidth > 1000) {
        return 4
      } else {
        return 3
      }
    }
  },
  watch: {
    async $route(to) {
      try {
        const targetCategory = (await menuService.getItems(to.params.category)).data
        this.categoryName = targetCategory.categoryName
        this.items = targetCategory.items
      } catch(err) {
        console.log(err)
      }
    }
  },
  async created() {
    try {
      const targetCategory = (await menuService.getItems(this.$route.params.category)).data
      this.categoryName = targetCategory.categoryName
      this.items = targetCategory.items
    } catch(err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>