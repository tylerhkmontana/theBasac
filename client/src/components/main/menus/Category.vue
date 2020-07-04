<template>
  <v-toolbar class="mt-5 orange mx-auto" style="border-radius: 15px;" dark max-width="1000px">
    <v-slide-group prev-icon="mdi-menu-left" next-icon="mdi-menu-right" show-arrows>
      <v-slide-item v-for="category in categories" :key="category._id">
        <v-btn 
          class="transparent white--text pa-2 mx-2" 
          depressed :to="`/menu/${category._id}`" 
          :style="`font-size: ${resFontSize}; height: auto;`" 
          active-class="red darken-1"
          rounded>
          {{ category.categoryName }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-toolbar>
</template>

<script>
import menuService from '@/services/menu.service.js'

export default {
  data() {
    return {
      categories: null
    }
  },
  computed: {
    resFontSize() {
      if(this.windowWidth < 700) {
        return '3vw'
      } else {
        return '16px'
      }
    }
  },
  async created() {
    try {
      this.categories = (await menuService.getMenu()).data
    } catch(err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>