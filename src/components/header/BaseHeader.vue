<template>
			<div class="base-header">
						<div class="base-header__title">
									<img class="logo" src="http://x-lines.ru/letters/i/cyrillicscript/0138/000000/28/0/jt1s45mb.png" border="0" />
						</div>
			</div>
</template>

<script>
	export default {
		name: "BaseHeader"
	}
</script>

<style lang="scss">

.base-header {
			margin: 0;
			height: 10vh;
			background-color: cadetblue;
			align-items: baseline;
			&__title {
						display: block;
						padding-top: 2vh;
						padding-left: 2vh;
			}
}

</style>