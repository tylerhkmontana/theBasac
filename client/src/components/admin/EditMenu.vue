<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="4">
        <v-card class="py-3 px-5 d-flex flex-column transparent" height="100%" max-width="100%" style="min-height: 350px" flat>
          <v-file-input dark label="attach image"></v-file-input>
          <v-text-field dark label="Item Name" style="text-color: white;"></v-text-field>
          <v-text-field dark label="Price"></v-text-field>
          <v-btn dark outlined>Add Item</v-btn>
        </v-card>
      </v-col>
      <v-col class="d-flex justify-center" cols="4" v-for="item in getItems" :key="item._id" >
        <FoodCard 
        cardHeight="90%" 
        cardWidth="100%" 
        imgHeight="200" 
        :foodInfo="item"/>
      </v-col>
      <v-col class="d-flex justify-center" cols="4" v-for="item in getItems" :key="item._id" >
        <FoodCard 
        cardHeight="90%" 
        cardWidth="100%" 
        imgHeight="200" 
        :foodInfo="item"/>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import menuService from "@/services/menu.service.js"
import FoodCard from "@/components/main/menus/FoodCard.vue"

export default {
  data() {
    return {
      items: []
    }
  },
  components: {
    FoodCard
  },
  computed: {
    getItems() {
      return this.items
    }
  },
  watch: {
    async $route(to) {
      const result = (await menuService.getItems(to.params.category)).data
      this.items = result.items
      console.log(result)
    }
  },
  async created() {
    const result = (await menuService.getItems(this.$route.params.category)).data
    this.items = result.items
    console.log(result)
  }
}
</script>

<style scoped>

</style>