<template>
	<div class="base-layout">
		<BaseHeader/>
		<router-view class="base-layout__main"></router-view>
		<BaseFooter/>
	</div>
</template>

<script>
	import BaseHeader from '../header/BaseHeader'
	import BaseFooter from '../footer/BaseFooter'

	export default {
		name: 'layout',
		components: {
			BaseHeader,
			BaseFooter
		},
	}
</script>

<style lang="scss">
	.base-layout {

		&__main {
			margin-top: 56px;
			padding-top: 1px;
			min-height: calc(100vh - 6vh - 56px);
		}
	}
</style>