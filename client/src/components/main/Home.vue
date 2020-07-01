<template>
  <div class="home">

    <v-carousel cycle show-arrows-on-hover hide-delimiter-background height="auto">
      <v-carousel-item v-for="(src, i) in getSlideSrc" :key="i">
        <v-img :aspect-ratio="16/9" :src="src" max-height="500px"></v-img>
      </v-carousel-item>
    </v-carousel>

    <v-col class="d-flex justify-space-between pa-0" cols="12">
      <v-col class="d-flex flex-column align-start" cols="6">
        <p class="mb-1" :style="`font-size: ${resFontSize};`">158-09B Norther blvd, Flushing 11358</p>
        <v-chip tag="a" href="tel:7187628484" :style="`font-size: ${resFontSize};`" color="black" :small="resChipSize" outlined pill>
          <v-icon :size="resFontSize">mdi-phone</v-icon>&nbsp;718-762-8484
        </v-chip>
      </v-col>
      <v-col :class="`d-flex ${resDeliveryButton.flex} pa-0`" cols="6">
        <a :class="resDeliveryButton.margin" href="https://www.ubereats.com/new-york/food-delivery/the-basac/QdEFfhT0S3qT6Mv2nuAeJA" target="_blank">
          <v-img src="@/assets/images/UberEats_Badge_Horizontal.png" :width="resDeliveryButton.uber"></v-img> 
        </a>
        <a :class="resDeliveryButton.margin" href="https://www.doordash.com/business/78603/?utm_source=partner-link&utm_medium=website&utm_campaign=78603&utm_content=red-xl" target="_blank" alt="Order Food Delivery with DoorDash" title="Order Food Delivery with DoorDash">
          <v-img src="https://cdn.doordash.com/media/button/button_red_xl.svg" :width="resDeliveryButton.doordash"></v-img>
        </a>
      </v-col>
      
    </v-col>

    <v-container class="my-10 pa-10" fluid>

      <p class="text-center mb-10 font-weight-bold" :style="`font-size: ${resTitleFont}`">
        MENU <v-icon class="pb-2" :size="resTitleFont" color="black">mdi-silverware-fork-knife</v-icon>
      </p>
      <p class="text-center" :style="`font-size: ${resFontSize};`"><strong>Store Hours</strong><br>MON-SUN 11:00 AM ~ 11:00 PM</p>
      <v-row class="my-7" v-for="category in menu" :key="category._id">
        <p class="ma-0 font-weight-bold" :style="`font-size: ${resCategoryFont};`">
          <v-icon class="pb-1" color="black" :size="resCategoryFont">mdi-check</v-icon> 
          {{ category.categoryName }}
        </p>
        <v-col cols="12">
          <v-row>
            <v-col class="d-flex justify-space-between" :cols="resColSize" v-for="item in category.items" :key="item._id">
              <div class="d-flex flex-column">
                <span :style="`font-size: ${resFontSize}; color: orange;`" class="font-weight-bold" color="orange">{{ item.kName }}</span>
                <span :style="`font-size: ${resSmallFontSize};`">{{ item.eName }}</span>
              </div>
              <span :style="`font-size: ${resFontSize};`" dark>$ {{ item.price }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Alert Message -->
      <v-dialog v-model="manageAlert" max-width="600">
        <v-container class="white" v-if="alert">
          <div class="d-flex justify-end">
            <v-btn depressed color="transparent" @click="manageAlert = false">X</v-btn>
          </div>
          <div class="d-flex flex-column justify-space-between">
            <p class="text-center mb-10 alert-message font-weight-bold" :style="`font-size: ${resCategoryFont}`">{{ alert.title }}</p>
            <p class="alert-message mb-10" :style="`font-size: ${resFontSize}`">{{ alert.message }}</p>
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
    },
    resFontSize() {
      if(this.windowWidth < 700) {
        return '3vw'
      } else {
        return '18px'
      }
    },
    resChipSize() {
      if(this.windowWidth  < 700) {
        return true
      } else {
        return false
      }
    },
    resColSize() {
      if(this.windowWidth < 700) {
        return 12
      } else if(this.windowWidth < 1350 && this.windowWidth > 700) {
        return 6
      } else {
        return 4
      }
    },
    resSmallFontSize() {
      if(this.windowWidth < 700) {
        return '2vw'
      } else {
        return '14px'
      }
    },
    resCategoryFont() {
      if(this.windowWidth  < 700) {
        return '4vw'
      } else {
        return '25px'
      }
    },
    resTitleFont() {
      if(this.windowWidth  < 700) {
        return '6vw'
      } else {
        return '35px'
      }
    },
    resDeliveryButton() {
      if(this.windowWidth  < 700) {
        return {
          uber: '20vw',
          doordash: '15vw',
          flex: 'flex-column align-end',
          margin: 'mt-2 mr-2'
        }
      } else {
        return {
          uber: '170px',
          doordash: '137px',
          flex: 'justify-end',
          margin: 'ma-2'
        }
      }
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