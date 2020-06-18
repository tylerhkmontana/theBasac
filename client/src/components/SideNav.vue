<template>
  <v-navigation-drawer app dark permanent="" floating="" style="margin-top: 200px; height: 300px;">
    <v-list-item-group>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-airplane</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title style="font-size: 20px">
            Travel
          </v-list-item-title>

          <v-list-item-subtitle>
            plan
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-alert</v-icon>
        </v-list-item-icon>
        
        <v-list-item-content>
          <v-list-item-title style="font-size: 20px">
           Social Distance
          </v-list-item-title>
          <v-list-item-subtitle>
            6ft apart
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-hand-water</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-btn style="font-size: 20px" @click="test">
            Wash Your Hands
          </v-list-item-btn>
          <v-list-item-subtitle>
            for 20sec
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-navigation-drawer>  
</template>

<script>
export default {
  methods: {
    test() {
      console.log("Testing...")
    }
  }
}
</script>

<style scoped>

</style>