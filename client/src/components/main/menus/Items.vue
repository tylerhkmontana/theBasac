<template>
  <div>
    <h1>{{ this.currCategory }}</h1>
    <v-col cols="12">
      <v-row> 
        <v-col class="d-flex justify-center" cols="4" v-for="item in currItems" :key="item._id" >
          <FoodCard 
          cardHeight="70%" 
          cardWidth="100%" 
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