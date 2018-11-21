<template>
			<div class="base-footer">
						<div class="base-footer__info">
									<span>I'am footer</span>
						</div>
			</div>
</template>

<script>
	export default {
		name: "BaseFooter"
	}
</script>

<style lang="scss">

			.base-footer	{
						background-color: burlywood;
						height: 9vh;
						&__info {
									padding-top: 2vh;
									text-align: center;
						}
			}

</style>