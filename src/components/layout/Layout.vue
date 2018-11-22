<template>
			<div>
						<BaseHeader/>
						<router-view></router-view>
			</div>
</template>

<script>
	import BaseHeader from '../header/BaseHeader'

	export default {
		name: 'layout',
		components: {
			BaseHeader,
		},
	}
</script>

<style lang="scss">

</style>