<template>
	<div class="base-footer">
		<v-footer>
			<span>{{$t('$footer.title')}}</span>
		</v-footer>
	</div>
</template>

<script>
	export default {
		name: "BaseFooter"
	}
</script>

<style lang="scss">

	.base-footer {
		width: 100%;
		background-color: #f5f5f5;
		display: flex;
		justify-content: space-around;
	}

</style>