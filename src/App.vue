<template>
	<v-app>
		<div class="main-app" id="#app">
			<router-view/>
		</div>
	</v-app>
</template>

<script>
	import {VApp} from 'vuetify/lib'
	import router from './router/router'

	export default {
		name: 'app',
		components: {
			VApp
		},
		router
	}
</script>

<style lang="scss">
	@import "scss/reset.scss";


</style>
