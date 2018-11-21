<template>
  <div>
    <v-toolbar
    :dark="true"
    :fixed="true"
    />
    <BaseMain/>
  </div>
</template>

<script>
import BaseMain from '../main/BaseMain'
import {VToolbar} from 'vuetify/lib'


export default {
  name: 'layout',
  components: {
    BaseMain,
    VToolbar
  },
}
</script>

<style lang="scss">

</style>