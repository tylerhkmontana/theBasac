<template>
  <v-container :style="`width: ${responsiveDesign.windowSize}`" fluid>
    <h1 class="text-center white--text">Menu Management</h1>
    <div class="d-flex flex-column">
      <v-btn 
        class="mx-auto"
        @click="logout" 
        color="red accent-4" 
        dark
        depressed
      >
        LOG OUT
      </v-btn>
      <v-row :class="`d-flex ${responsiveDesign.manageButtons}`">
        <v-btn 
          class="my-5 mx-auto" 
          color="blue-grey darken-3"
          @click="manageCategory = true"
          depressed
          dark
        >
          MANAGE CATEGORY
        </v-btn>

        <v-btn 
          class="my-5 mx-auto" 
          color="blue-grey darken-3"
          @click="manageSlides = true"
          depressed
          dark
        >
          MANAGE SLIDES
        </v-btn>

        <v-btn 
          class="my-5 mx-auto" 
          color="blue-grey darken-3"
          @click="manageAlert = true"
          depressed
          dark
        >
          MANAGE Alert
        </v-btn>
      </v-row>
    </div>
    

    <!-- Manage Category Dialogue -->
    <v-dialog v-model="manageCategory" :max-width="responsiveDesign.dialogWidth" dark>
      <v-container class="blue-grey">
        <h2 class="text-center white--text">Manage Category</h2>
        <p class="text-center red--text mx-5">{{ this.error }}</p>
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-text-field label="Category" autocomplete="off" v-model="newCategory"></v-text-field>
          </v-col>
          <v-col class="d-flex justify-center" cols="4">
            <v-btn class="white--text" depressed outlined @click="addCategory">ADD</v-btn>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-select :items="selectCategories" v-model="selectedCategory"></v-select>
          </v-col>
          <v-col class="d-flex justify-center" cols="4">
            <v-btn class="white--text" depressed type="submit" outlined @click="deleteCategory">DELETE</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <!-- Manage Slides Dialogue -->
    <v-dialog v-model="manageSlides" :max-width="responsiveDesign.dialogWidth" dark>
      <v-container class="blue-grey">
        <h2 class="text-center white--text">Manage Slides</h2>
        <p class="text-center red--text mx-5">{{ this.error }}</p>
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-file-input label="add slide" v-model="newSlide"></v-file-input>
          </v-col>
          <v-col class="d-flex justify-center" cols="4">
            <v-btn class="white--text" depressed outlined @click="addSlide">ADD</v-btn>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-select :items="getCurrSlides" v-model="selectedSlide"></v-select>
          </v-col>
          <v-col class="d-flex justify-center" cols="4">
            <v-btn class="white--text" depressed type="submit" outlined @click="deleteSlide">DELETE</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <!-- Manage Alert Dialogue -->
    <v-dialog v-model="manageAlert" :max-width="responsiveDesign.dialogWidth" dark>
      <v-container class="blue-grey">
        <h2 class="text-center white--text">Manage Alert</h2>
        <p class="text-center red--text mx-5">{{ this.error }}</p>
        <v-row class="d-flex flex-column justify-center">
          <v-text-field class="mx-5" label="Title" v-model="newAlert.title" outlined dense></v-text-field>
          <v-textarea class="mx-5" label="Message" v-model="newAlert.message" outlined></v-textarea>
          <v-col class="d-flex justify-center">
            <v-btn @click="resetAlert" class="mx-auto" color="red" depressed outlined>Reset</v-btn>
            <v-btn @click="addAlert" class="mx-auto" depressed outlined>Save</v-btn> 
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <v-toolbar style="border-radius: 10px; width: 100%; margin: auto;" color="transparent" flat>
      <v-slide-group show-arrows>
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
import alertService from "@/services/alert.service.js"

export default {
  data() {
    return {
      manageCategory: false,
      manageSlides: false,
      manageAlert: false,
      categories: [],
      newCategory: '',
      selectedCategory: '',
      selectedSlide: '',
      errorMessage: '',
      newSlide: null,
      currSlides: [],
      newAlert: {
        title: '',
        message: ''
      }
    }
  },
  computed: {
    error() {
      return this.errorMessage
    },
    dialoguesOff() {
      return (!this.manageSlides && !this.manageAlert && !this.manageCategory)
    },
    allCategories() {
      return this.categories
    },
    selectCategories() {
      return this.categories.map(m => (m.categoryName))
    },
    getCurrSlides() {
      return this.currSlides.map(m => (m.file.fileName))
    },
    responsiveDesign() {
      if(this.windowWidth < 700) {
        return {
          manageButtons: 'flex-column align-center justyify-center',
          windowSize: '100vw',
          dialogWidth: 400,
        }
      } else {
        return {
          manageButtons: 'justify-space-around',
          windowSize: '80vw',
          dialogWidth: 600
        }
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("thebasacadmin")
      this.$router.push({ name: 'Login' })
    },
    // Manage Category
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
    // Manage Slides
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
    },
    // Manage Alert
    async addAlert() {
      if(!this.newAlert.title || !this.newAlert.message) {
        this.errorMessage = "Please fill in all the fields"
      } else {
        try {
          await alertService.addAlert(this.newAlert)
          this.newAlert.title = ''
          this.newAlert.message = ''
          this.manageAlert = false
        } catch(err) {
          console.log(err)
          this.errorMessage = `*${err.response.data}`
        }
      }
    },
    async resetAlert() {
      try {
        await alertService.deleteAlert()
        this.manageAlert = false
      } catch(err) {
        console.log(err)
        this.errorMessage = `*${err.response.data}`
      }
    }
  },
  watch: {
    // Reset Error Message
    dialoguesOff: function(val) {
      if(val) {
        this.errorMessage = ''
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