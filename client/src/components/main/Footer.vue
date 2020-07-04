<template>
  <v-footer class="pa-0" height="auto" color="orange lighten-2">
    <v-col class="white--text d-flex flex-column align-start" :style="`font-size: ${resFontSize};`">
      &copy;The Basac II Inc. 2020
      <a class="white--text" href="https://github.com/tylerhkmontana" style="text-decoration: none;" target="_blank">
        designed & developed by tylerhkmontana
      </a>
    </v-col>
    <v-col class="white--text d-flex flex-column align-center hidden-xs pa-0" :style="`font-size: ${resFontSize};`" v-if="resStoreHours">
      <strong>Store Hours</strong>
      <small>MON-SUN 11:00 AM ~ 11:00 PM</small>
       <a class="white--text" href="#">Terms of Use</a>
    </v-col>
    <v-col class="white--text d-flex flex-column align-end" :style="`font-size: ${resFontSize};`">
      <span><v-icon color="white" :size="resFontSize">mdi-email</v-icon> thebasac158@gmail.com</span>
      <span><v-icon color="white" :size="resFontSize">mdi-phone</v-icon> 718-762-8484</span>
      <span style="text-align: right;"><v-icon color="white" :size="resFontSize">mdi-map-marker</v-icon> 15809B Northern blvd, Flushing, NY 11358</span>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    resFontSize() {
      if(this.windowWidth < 700) {
        return '2.5vw'
      } else {
        return '14px'
      }
    },
    resStoreHours() {
      if(this.windowWidth < 1350) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>

</style>