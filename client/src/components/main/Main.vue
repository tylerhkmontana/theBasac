<template>
  <div>
    <Header />
    <div>
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/main/Header.vue'
import Footer from '@/components/main/Footer.vue'

export default {
  components: {
    Header, Footer
  }
}
</script>

<style scoped>

</style>