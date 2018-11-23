<template>
			<div>
						<BaseHeader/>
						<router-view></router-view>
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

</style>