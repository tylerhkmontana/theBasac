<template>
  <v-container style="width: 500px; position: relative; top: 10%;" @keydown.enter="login">
    <h1 class="my-5 text-center white--text">ADMIN LOGIN</h1>
  
    <v-text-field class="white--text" label="adminID" dark v-model="admin.adminId"></v-text-field>
    <v-text-field label="password" type="password" dark v-model="admin.password"></v-text-field>
    <v-container class="mt-10 d-flex justify-center">
      <v-btn color="white" depressed outlined @click="login">LOGIN</v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      admin: {
        adminId: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      console.log(this.admin)
    }
  }
}
</script>

<style scoped>

</style>