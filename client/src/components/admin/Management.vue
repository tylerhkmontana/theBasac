<template>
  <v-container style="width: 80vw">
    <h1 class="text-center white--text">Menu Management</h1>
    <v-btn 
      @click="logout" 
      color="red accent-4" 
      style="position: absolute; top: 60px; right: 60px;"
      dark
      depressed
    >
      LOG OUT
    </v-btn>
    <v-row>
      <v-btn 
        class="my-5 mx-auto" 
        color="red accent-4"
        @click="manageCategory = true"
        outlined
      >
        MANAGE CATEGORY
      </v-btn>

      <v-btn 
        class="my-5 mx-auto" 
        color="red accent-4"
        @click="manageSlides = true"
        outlined
      >
        MANAGE SLIDES
      </v-btn>
    </v-row>

    <!-- Manage Category Dialogue -->
    <v-dialog v-model="manageCategory" max-width="600">
      <v-container class="white">
        <p class="text-center red--text mx-5">{{ this.error }}</p>
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-text-field color="orange" label="Category" autocomplete="off" v-model="newCategory"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn class="white--text" color="orange" depressed outlined @click="addCategory">ADD</v-btn>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-select :items="selectCategories" color="orange" v-model="selectedCategory"></v-select>
          </v-col>
          <v-col cols="2">
            <v-btn class="white--text" color="orange" depressed type="submit" outlined @click="deleteCategory">DELETE</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <!-- Manage Slides Dialogue -->
    <v-dialog v-model="manageSlides" max-width="600">
      <v-container class="white">
        <p class="text-center red--text mx-5">{{ this.error }}</p>
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-file-input label="add slide" color="black" v-model="newSlide"></v-file-input>
          </v-col>
          <v-col cols="2">
            <v-btn class="white--text" color="orange" depressed outlined @click="addSlide">ADD</v-btn>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-select :items="getCurrSlides" color="orange" v-model="selectedSlide"></v-select>
          </v-col>
          <v-col cols="2">
            <v-btn class="white--text" color="orange" depressed type="submit" outlined @click="deleteSlide">DELETE</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <v-toolbar style="border-radius: 10px; width: 80%; margin: auto;" color="transparent" flat>
      <v-slide-group>
        <v-slide-item v-for="category in allCategories" :key="category._id">
          <v-btn 
            class="mx-2" 
            depressed
            dark
            active-class="red accent-4"
            :to="`/admin/edit/${category._id}`"
            outlined
          >
            {{ category.categoryName }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-toolbar>

    <router-view></router-view>    
  </v-container>  
</template>

<script>
import menuService from "@/services/menu.service.js"
import slideService from "@/services/slide.service.js"

export default {
  data() {
    return {
      manageCategory: false,
      manageSlides: false,
      categories: [],
      newCategory: '',
      selectedCategory: '',
      selectedSlide: '',
      errorMessage: '',
      newSlide: null,
      currSlides: []
    }
  },
  computed: {
    error() {
      return this.errorMessage
    },
    allCategories() {
      return this.categories
    },
    selectCategories() {
      return this.categories.map(m => (m.categoryName))
    },
    getCurrSlides() {
      return this.currSlides.map(m => (m.file.fileName))
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("thebasacadmin")
      this.$router.push({ name: 'Login' })
    },
    async addCategory() {
      if(this.newCategory) {
        try {
          await menuService.addCategory({ categoryName: this.newCategory })
          this.categories = (await menuService.getMenu()).data
          this.newCategory = ''
        } catch(err) {
          console.log(err)
          this.errorMessage = `*${err.response.data}*`
        }
      } else {
        this.errorMessage = "*No string was given*"
      }
    },
    async deleteCategory() {
      try {
        await menuService.deleteCategory({ categoryName: this.selectedCategory })
        this.categories = (await menuService.getMenu()).data
        this.selectedCategory = ''
        this.$router.push({ name: "Management" })
      } catch(err) {
        console.log(err)
        this.errorMessage = `*${err.response.data}*`
      } 
    },
    async addSlide() {
      let formData = new FormData()

      formData.append('file', this.newSlide)

      try {
        await slideService.addSlide(formData)
        this.newSlide = null
        this.currSlides = (await slideService.getSlides()).data
      } catch(err) {
        console.log(err)
        this.errorMessage = `*${err.response.data}*`
      }
    },
    async deleteSlide() {
      let targetSlide = { fileName: this.selectedSlide }

      try {
        await slideService.deleteSlide(targetSlide)
        this.selectedSlide = ''
        this.currSlides = (await slideService.getSlides()).data
      } catch(err) {
        console.log(err)
        this.errorMessage = `*${err.response.data}`
      }
    }
  },
  async created() {
    try {
      this.categories = (await menuService.getMenu()).data
      this.currSlides = (await slideService.getSlides()).data
    } catch(err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>