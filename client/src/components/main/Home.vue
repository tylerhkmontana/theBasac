<template>
  <div class="home">

    <v-carousel cycle height="600" show-arrows-on-hover hide-delimiter-background>
      <v-carousel-item>
        <v-img src="https://s3-media0.fl.yelpcdn.com/bphoto/v33RYEy_Q0IqppGPowCJyw/o.jpg"></v-img>
      </v-carousel-item>
      <v-carousel-item>
        <v-img src="https://s3-media0.fl.yelpcdn.com/bphoto/r-RDoEcOfMKhlumLz8NliQ/o.jpg"></v-img>
      </v-carousel-item>
    </v-carousel>

    <v-container class="d-flex justify-end" fluid>
      <div class="d-flex flex-column align-end">
        <p style="font-size: 18px; margin-top: 5px;">158-09B Norther blvd, Flushing 11358</p>
        <v-chip tag="a" href="tel:7187628484" style="font-size: 18px;" color="black" outlined><v-icon>mdi-phone</v-icon>&nbsp;718-762-8484</v-chip>
      </div>
    </v-container>

    <v-container class="my-10 pa-10" fluid>
      <h1 class="text-center mb-10">MENU <v-icon class="pb-2" size="30" color="black">mdi-silverware-fork-knife</v-icon></h1>
      <v-row class="my-7" v-for="category in menu" :key="category._id">
        <h2 class="text-center"><v-icon class="pb-2" color="black">mdi-check</v-icon> {{ category.categoryName }}</h2>
        <v-col cols="12">
          <v-row>
            <v-col class="d-flex justify-space-between" cols="3" v-for="item in category.items" :key="item._id">
              <div>
                <v-chip class="font-weight-bold" color="orange" outlined>{{ item.kName }}</v-chip><br>
                <v-chip color="black" outlined small>{{ item.eName }}</v-chip>
              </div>
              <span dark>$ {{ item.price }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-divider class="mx-1 my-5"></v-divider>
      </v-row>
      
    </v-container>
  </div>
</template>

<script>
import menuService from '@/services/menu.service.js'
export default {

  data() {
    return {
      menu: {}
    }
  },
  async created() {
    try {
      this.menu = (await menuService.getMenu()).data
    } catch(err) {
      console.log(err)
    } 
  }
}
</script>

<style scoped>
.first-pannel {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}
</style>