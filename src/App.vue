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
	@import 'scss/reset.scss';
	@import 'scss/colors';
	@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400');
	.main-app {
		font-family: 'Montserrat', sans-serif;
	}
</style>
