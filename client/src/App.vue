<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>    
</template>

<script>
import Footer from '@/components/main/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
};
</script>

<style scoped>
*{
  font-family: 'Balsamiq Sans', cursive;
}
</style>