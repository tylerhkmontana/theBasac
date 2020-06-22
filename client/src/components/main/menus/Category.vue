<template>
  <v-toolbar class="mt-5 orange mx-auto" style="border-radius: 15px" dark max-width="1000px">
    <v-slide-group show-arrows>
      <v-slide-item>
        <v-btn color="transparent mx-10 white--text" depressed to="/menu/katsu" rounded>
          Katsu/Donbouri
        </v-btn>
      </v-slide-item>

      <v-slide-item>
        <v-btn color="transparent mx-10 white--text" depressed to="/menu/snackfood" rounded>
          Korean Snackfoods
        </v-btn>
      </v-slide-item>

      <v-slide-item>
        <v-btn color="transparent mx-10 white--text" depressed to="/menu/friedfood" rounded>
          Fried Foods
        </v-btn>
      </v-slide-item>

      <v-slide-item>
        <v-btn color="transparent mx-10 white--text" depressed to="/menu/noodle" rounded>
          Noodles
        </v-btn>
      </v-slide-item>

      <v-slide-item>
        <v-btn color="transparent mx-10 white--text" depressed to="/menu/chicken" rounded>
          Bonless Chicken
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-toolbar>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>