<template>
  <div>
    <Category />
    <v-container class="mt-5" fluid style="width: 90%; min-height: 100vh;">
      <router-view></router-view> 
    </v-container>  
  </div>
</template>

<script>
import Category from '@/components/main/menus/Category.vue'

export default {
  components: {
    Category
  }
}
</script>

<style scoped>

</style>