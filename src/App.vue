<template>
  <v-app>
    <div class="main-app">
      <layout/>
    </div>
  </v-app>
</template>

<script>
import Layout from "./components/layout/Layout";
import {VApp} from 'vuetify/lib'

export default {
  name: 'app',
  components: {
    Layout,
    VApp
  }
}
</script>

<style lang="scss">

</style>
