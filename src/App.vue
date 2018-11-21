<template>
  <v-app>
    <div class="main-app">
      <layout/>
    </div>
  </v-app>
</template>

<script>
import Layout from "./components/layout/Layout";

export default {
  name: 'app',
  components: {
    Layout
  }
}
</script>

<style lang="scss">

</style>
