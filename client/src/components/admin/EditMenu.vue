<template>
  <v-col cols="12">
    <p class="text-center red--text" v-for="(e, i) in error" :key="i">*{{ e }}*</p>
    <v-row>

      <v-col class="py-3 px-5 d-flex flex-column transparent" :cols="resColSize">
        <h1 class="white--text text-center font-weight-light">Add Item</h1>
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
        <v-btn dark outlined @click="addItem">Add</v-btn>
      </v-col>

      <v-col class="d-flex flex-column" height="100%" :cols="resColSize">
        <h1 class="white--text text-center font-weight-light">Delete Item</h1>
        <v-combobox :items="getItemNames" dark multiple chips v-model="selectedItemsDelete"></v-combobox>
        <v-btn depressed outlined dark @click="deleteItems">Delete</v-btn>
      </v-col>

      <v-col class="py-3 px-5 d-flex flex-column transparent" :cols="resColSize">
        <h1 class="white--text text-center font-weight-light">{{ updateMode }}</h1>
        <v-switch :label="`Mode: ${updateMode}`" v-model="orderUpdate" @change="resetFields" dark></v-switch>
        <v-select :items="getItemNames" v-model="newItemInfo.selectedItem" @change="setItemInfo" label="select item to update" dark :disabled="orderUpdate"></v-select>
        <v-text-field label="price" type="number" v-model="newItemInfo.price" dark :disabled="orderUpdate"></v-text-field>
        <v-file-input label="item picture" v-model="newItemInfo.file" dark :disabled="orderUpdate"></v-file-input>
        <v-combobox :items="getItemNames" dark multiple chips v-model="selectedItemsUpdate" label="select items in desired order" :disabled="!orderUpdate"></v-combobox>
        <v-btn dark outlined @click="updateItemInfo">Update</v-btn>
      </v-col>

      <v-col class="d-flex justify-center" :cols="resColSize" v-for="item in getItems" :key="item._id" >
        <FoodCard 
        cardHeight="90%" 
        :cardWidth="resFoodCardWidth" 
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
      selectedItemsDelete: null,
      selectedItemsUpdate: null,
      updateItemModal: false,
      newItemInfo: {
        _id: null,
        price: null,
        file: null,
        selectedItem: null
      },
      orderUpdate: false
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
    },
    updateMode() {
      return this.orderUpdate ? "Update Order" : "Update Item"
    },
    resColSize() {
      if(this.windowWidth < 700) {
        return 12
      } else if(this.windowWidth > 700 && this.windowWidth < 1000) {
        return 6
      } else {
        return 4
      }
    },
    resFoodCardWidth() {
      if(this.windowWidth < 700) {
        return '60vw'
      } else {
        return '350'
      }
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
        items: this.selectedItemsDelete,
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
    async updateItemInfo() {
      if(this.orderUpdate) {
        // Update Order
        if(!!this.selectedItemsUpdate && this.selectedItemsUpdate.length === this.items.length) {
          try {
            this.items = (await menuService.updateOrder({ itemOrder: this.selectedItemsUpdate, categoryId: this.$route.params.category })).data
          } catch(err) {
            this.errorMessage.push(err.response.data)
          }
        } else {
          this.errorMessage.push("Please select all the items")
        }
      } else {
        // Update Item
        let formData = new FormData

        formData.append('file', this.newItemInfo.file)
        formData.set('price', this.newItemInfo.price)
        formData.set('_id', this.newItemInfo._id  )
        formData.set('itemOrder', this.selectedItemsUpdate)

        try {
          this.items = (await menuService.updateItem(formData)).data
        } catch(err) {
          this.errorMessage.push(err.response.data)
        }
      }

      this.resetFields()
    },
    setItemInfo() {
      const selectedItem = this.items.find(item => item["eName"] === this.newItemInfo.selectedItem)
      this.newItemInfo.price = selectedItem.price
      this.newItemInfo._id = selectedItem._id
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
      this.selectedItemsDelete = null
      this.newItemInfo = {
          _id: null,
          price: null,
          file: null,
          selectedItem: null
      }
      this.selectedItemsUpdate = null
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