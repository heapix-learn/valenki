<template>
			<div class="base-main">
							<div class="base-main__page">
									<span>Hello World!</span>
							</div>
			</div>
</template>

<script>
	export default {
		name: "BaseMain"
	}
</script>

<style lang="scss">

.base-main{
			padding-top: 1vh;
			&__page {
						background-color: aquamarine;
						text-align: center;
						height: 75vh;
						padding-top: 2vh;
						margin-bottom: 1vh;
			}
}


</style>