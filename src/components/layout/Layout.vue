<template>
<div>
    <BaseHeader/>
    <BaseMain/>
</div>
</template>

<script>
import BaseHeader from "@/components/header/BaseHeader.vue";
import BaseMain from "@/components/main/BaseMain.vue";



export default {
  name: 'layout',
  components: {
    BaseHeader,
    BaseMain
  }
}
</script>

<style lang="scss">

</style>