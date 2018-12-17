<template>
	<div class="register-page__pick-langs">
		<div @click="changeLang('ru')">
			<img
				src="../../assets/countries/Russia.png" height="64"
				width="64"/>
		</div>
		<div @click="changeLang('en')">
			<img
				src="../../assets/countries/United-States.png" height="64"
				width="64"/>
		</div>
	</div>
</template>

<script>
	import i18n from '../../plugins/vuei18n/i18n'

	export default {
		name: "SetLanguage",
		methods: {
			changeLang(lang) {
				console.log('lang', lang)
				i18n.locale = lang
				localStorage.setItem('locale', lang)
				this.$emit('changeLocale')
			}
		}
	}
</script>

<style scoped>

</style>