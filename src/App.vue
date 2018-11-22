<template>
			<v-app>
						<div class="main-app">
												<layout/>
						</div>
			</v-app>
</template>

<script>
	import Layout from "./components/layout/Layout";
	import {VApp} from 'vuetify/lib'
	import router from './router/router'

	export default {
		name: 'app',
		components: {
			Layout,
			VApp
		},
		router
	}
</script>

<style lang="scss">
			@import "scss/reset.scss";


</style>
