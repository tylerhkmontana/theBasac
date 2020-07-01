<template>
  <v-container :style="`width: ${resLoginWindow}; position: relative; top: 10%;`" @keydown.enter="login">
    <h1 class="my-5 text-center white--text">ADMIN LOGIN</h1>

    <p class="red--text text-center">{{ error }}</p>
    <v-text-field class="white--text" label="adminID" dark v-model="admin.adminId"></v-text-field>
    <v-text-field label="password" type="password" dark v-model="admin.password"></v-text-field>
    <v-container class="mt-10 d-flex justify-center">
      <v-btn color="white" depressed outlined @click="login">LOGIN</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import AdminService from '@/services/admin.service.js'

export default {
  data() {
    return {
      admin: {
        adminId: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  computed: {
    error() {
      return this.errorMessage
    },
    resLoginWindow() {
      if(this.windowWidth < 700) {
        return '300px'
      } else {
        return '500px'
      }
    }
  },
  methods: {
    async login() {
      try {
        const confirmedAdmin = (await (AdminService.login(this.admin))).data

        localStorage.setItem("thebasacadmin", JSON.stringify(confirmedAdmin))
        this.$router.push({ name: 'Management' })
      } catch(err) {
        this.errorMessage = `*${err.response.data}*`
      }
    }
  }
}
</script>

<style scoped>

</style>