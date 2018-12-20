<template>
	<v-footer class="base-footer">
		<span>{{ $t('$footer.title') }}</span>

	</v-footer>
</template>

<script>
	export default {
		name: "BaseFooter"
	}
</script>

<style lang="scss">

	.base-footer {
		justify-content: space-around;
	}

</style>