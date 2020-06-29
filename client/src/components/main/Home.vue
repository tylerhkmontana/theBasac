<template>
  <div class="home">

    <v-carousel cycle show-arrows-on-hover hide-delimiter-background>
      <v-carousel-item v-for="(src, i) in getSlideSrc" :key="i">
        <v-img :aspect-ratio="16/9" :src="src"></v-img>
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

      <!-- Alert Message -->
      <v-dialog v-model="manageAlert" max-width="600">
        <v-container class="white" v-if="alert">
          <div class="d-flex justify-end">
            <v-btn depressed color="transparent" @click="manageAlert = false">X</v-btn>
          </div>
          <div class="d-flex flex-column justify-space-between">
            <h1 class="text-center mb-10 alert-message">{{ alert.title }}</h1>
            <p class="alert-message mb-10">{{ alert.message }}</p>
            <div class="d-flex justify-center" style="font-family: 'Indie Flower', cursive; font-size:25px;">
              <span class="font-weight-normal">The</span>
              <span class="orange--text font-weight-bold">Basac</span>
            </div>
          </div>
        </v-container>
      </v-dialog>
      
    </v-container>
  </div>
</template>

<script>
import menuService from '@/services/menu.service.js'
import slideService from '@/services/slide.service.js'
import alertService from '@/services/alert.service.js'

export default {

  data() {
    return {
      menu: {},
      slides: [],
      alert: null,
      manageAlert: false
    }
  },
  computed: {
    getSlideSrc() {
      return this.slides.map(s => {
        const { contentType, data } = s.file
    
        var binary = '';
        var bytes = new Uint8Array( data.data );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return `data:${contentType};base64,` + btoa(binary);
      })
    }
  },
  async created() {
    try {
      this.menu = (await menuService.getMenu()).data
      this.slides = (await slideService.getSlides()).data
      this.alert = (await alertService.getAlert()).data[0]
      if(this.alert) {
        this.manageAlert = true
      }
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

.alert-message {
 white-space: pre-wrap;       /* css-3 */
 white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
 white-space: -pre-wrap;      /* Opera 4-6 */
 white-space: -o-pre-wrap;    /* Opera 7 */
 word-wrap: break-word;       /* Internet Explorer 5.5+ */
 text-align: center;
 font-family: 'Balsamiq Sans', cursive;
}
</style>