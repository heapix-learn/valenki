<template>
			<div class="base-main">
							<div class="base-main__page">
									<span>Hello World!</span>
							</div>
			</div>
</template>

<script>
export default {
  name: "BaseMain",
  components: {
  }
};
</script>

<style lang="scss">
.base-main {
  height: 2000px;
  padding-top: 1vh;
  &__page {
    background-color: aquamarine;
    text-align: center;
    height: 75vh;
    padding-top: 15vh;
    margin-bottom: 1vh;
  }
}
</style>