<template>
  <div>
    <BaseHeader/>
    <BaseMain/>
  </div>
</template>

<script>
import BaseHeader from '../header/BaseHeader'
import BaseMain from '../main/BaseMain'

export default {
  name: 'layout',
  components: {
    BaseHeader,
    BaseMain
  },
}
</script>

<style lang="scss">

</style>