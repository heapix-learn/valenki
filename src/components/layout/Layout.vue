<template>
	<div class="base-layout">
		<BaseHeader/>
		<div class="base-layout__main">
			<router-view>
				<slot/>
			</router-view>
		</div>
		<AddButton/>
		<BaseFooter/>
	</div>
</template>

<script>
	import BaseHeader from '../header/BaseHeader'
	import BaseFooter from '../footer/BaseFooter'
	import AddButton from './AddButton'

	export default {
		name: 'layout',
		components: {
			BaseHeader,
			AddButton,
			BaseFooter
		},
	}
</script>

<style lang="scss">

	.base-layout {

		&__header {
		}

		&__main {
			margin-top: 56px;
			min-height: calc(100vh - 56px - 36px);
		}

		&__footer {
		}
	}

</style>