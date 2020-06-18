<template>
  <div>
    <Category />
    <v-container class="mt-10" fluid style="width: 80%">
      <router-view></router-view> 
    </v-container>  
  </div>
</template>

<script>
import Category from '@/components/menus/Category.vue'

export default {
  components: {
    Category
  }
}
</script>

<style scoped>

</style>