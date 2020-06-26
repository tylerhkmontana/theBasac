<template>
  <v-col cols="12">
    <p class="text-center red--text" v-for="(e, i) in error" :key="i">*{{ e }}*</p>
    <v-row>

      <v-col class="py-3 px-5 d-flex flex-column transparent" cols="4">
        <v-file-input 
          dark 
          label="attach image" 
          v-model="newItem.file" 
          show-size
          accept="image/*"></v-file-input>
        <v-text-field 
          dark 
          label="item name in Korean" 
          style="text-color: white;" 
          v-model="newItem.kName"></v-text-field>  
        <v-text-field 
          dark 
          label="item name in English" 
          style="text-color: white;" 
          v-model="newItem.eName"></v-text-field>
        <v-text-field 
          dark 
          label="$price" 
          type="number" 
          v-model.number="newItem.price"></v-text-field>
        <v-textarea 
          dark 
          label="description(optional)" 
          rows="1" 
          auto-grow v-model="newItem.description"></v-textarea>
        <v-btn dark outlined @click="addItem">Add Item</v-btn>
      </v-col>

      <v-col class="d-flex flex-column" height="100%" cols="4">
        <h1 class="white--text text-center font-weight-light">Delete Item</h1>
        <v-combobox :items="getItemNames" dark multiple chips v-model="selectedItems"></v-combobox>
        <v-btn depressed outlined dark @click="deleteItems">Delete</v-btn>
      </v-col>

      <v-col class="d-flex justify-center" cols="4" v-for="item in getItems" :key="item._id" >
        <FoodCard 
        cardHeight="90%" 
        cardWidth="350px" 
        imgHeight="200" 
        :foodInfo="item"/>
      </v-col>

    </v-row>
  </v-col>
</template>

<script>
import menuService from "@/services/menu.service.js"
import FoodCard from "@/components/main/menus/FoodCard.vue"

export default {
  data() {
    return {
      items: [],
      errorMessage: [],
      newItem: {
        kName: '',
        eName: '',
        price: null,
        description: '',
        file: null,
        category: this.$route.params.category
      },
      selectedItems: null
    }
  },
  components: {
    FoodCard
  },
  computed: {
    getItems() {
      return this.items
    },
    error() {
      return this.errorMessage
    },
    getItemNames() {
      return this.items.map(i => (i.eName))
    }
  },
  methods: {
    async addItem() {
      this.errorMessage = this.formValidation()
      if(this.errorMessage.length === 0) {
        let formData = new FormData()

        formData.append('file', this.newItem.file)
        for(let key in this.newItem) {
          formData.set(key, this.newItem[key])
        }
        try {
          await menuService.addItem(formData)
          const result = (await menuService.getItems(this.$route.params.category)).data
          this.items = result.items
        } catch(err) {
          console.log(err)
          this.errorMessage.push(err.response.data)
        }
      }
      this.resetFields()
    },
    async deleteItems() {
      const targetItems = {
        items: this.selectedItems,
        categoryId: this.$route.params.category
      }
      try {
        await menuService.deleteItems(targetItems)
        const result = (await menuService.getItems(this.$route.params.category)).data
        this.items = result.items
      } catch(err) {
        console.log(err)
        this.errorMessage.push(err.response.data)
      }
      this.resetFields()
    },
    formValidation() {
      const errors = []
      if(!this.newItem.price) {
        errors.push("Please fill in price")
      } 

      if(this.newItem.eName === '' || this.newItem.kName === '') {
        errors.push("Please fill in item name")
      }
      
      if(this.newItem.file) {
         this.newItem.file.size < 16000000 || errors.push("Attached image is too big.(>16mb)")
      }

      return errors
    },
    resetFields() {
      this.newItem.kName = ''
      this.newItem.eName = ''
      this.newItem.price = null
      this.newItem.description = ''
      this.newItem.file = null
      this.selectedItems = null
    }
  },
  watch: {
    async $route(to) {
      try {
        const result = (await menuService.getItems(to.params.category)).data
        this.items = result.items
        this.newItem.category = to.params.category
      } catch(err) {
        this.errorMessage.push(err.response.data)
      }
    }
  },
  async created() {
    try {
      const result = (await menuService.getItems(this.$route.params.category)).data
      this.items = result.items
    } catch(err) {
      this.errorMessage.push(err.response.data)
    }
  }
}
</script>

<style scoped>

</style>