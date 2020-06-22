<template>
  <v-container style="width: 80vw">
    <h1 class="white--text text-center">Menu Management</h1>
    <v-row>
      <v-btn 
        class="my-5 mx-auto white--text" 
        @click="manageCategory = true"
        color="white"
        outlined
        >
          MANAGE CATEGORY
        </v-btn>
    </v-row>
    <v-dialog v-model="manageCategory" max-width="600">
      <v-container class="white">
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-text-field color="orange" label="Category"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn class="white--text" color="orange" depressed>ADD</v-btn>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-select :items="categories" color="orange"></v-select>
          </v-col>
          <v-col cols="2">
            <v-btn class="white--text" color="orange" depressed>DELETE</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <v-toolbar style="border-radius: 10px; width: 80%; margin: auto;" flat>
      <v-slide-group>
        <v-slide-item>
          <v-btn class="mx-2" color="orange" depressed outlined to="/admin/edit/katsu%20donbouri">katsu/donbouri</v-btn>
        </v-slide-item>
        <v-slide-item>
          <v-btn class="mx-2" color="orange" depressed outlined>katsu/donbouri</v-btn>
        </v-slide-item>
        <v-slide-item>
          <v-btn class="mx-2" color="orange" depressed outlined>katsu/donbouri</v-btn>
        </v-slide-item>
        <v-slide-item>
          <v-btn class="mx-2" color="orange" depressed outlined>katsu/donbouri</v-btn>
        </v-slide-item>
        <v-slide-item>
          <v-btn class="mx-2" color="orange" depressed outlined>katsu/donbouri</v-btn>
        </v-slide-item>
        <v-slide-item>
          <v-btn class="mx-2" color="orange" depressed outlined>katsu/donbouri</v-btn>
        </v-slide-item>
        <v-slide-item>
          <v-btn class="mx-2" color="orange" depressed outlined>katsu/donbouri</v-btn>
        </v-slide-item>
        <v-slide-item>
          <v-btn class="mx-2" color="orange" depressed outlined>katsu/donbouri</v-btn>
        </v-slide-item>
        <v-slide-item>
          <v-btn class="mx-2" color="orange" depressed outlined>katsu/donbouri</v-btn>
        </v-slide-item>
        <v-slide-item>
          <v-btn class="mx-2" color="orange" depressed outlined>katsu/donbouri</v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-toolbar>

    <router-view></router-view>    
  </v-container>  
</template>

<script>
export default {
  data() {
    return {
      manageCategory: false,
      categories: ['katsu/donbouri', 'noodle', 'snack food']
    }
  }
}
</script>

<style scoped>

</style>