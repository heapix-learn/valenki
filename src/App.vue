<template>
  <div>
    <BaseHeader/>
    <BaseMain/>
    <BaseFooter/>
  </div>
</template>

<script>
import BaseMain from "./components/main/BaseMain";
import BaseHeader from "./components/header/BaseHeader";
import BaseFooter from "./components/footer/BaseFooter";

export default {
  name: 'app',
  components: {
    BaseFooter,
    BaseHeader,
    BaseMain
  }
}
</script>

<style lang="scss">

</style>
