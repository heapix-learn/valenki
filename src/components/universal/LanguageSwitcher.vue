<template>
	<div class="register-page__pick-langs">
		<div @click="changeLang('ru')">
			<img :class="{'active': lang == 'ru'}"
				src="../../assets/countries/Russia.png" height="64"
				width="64"/>
		</div>
		<div @click="changeLang('en')">
			<img :class="{'active': lang == 'en'}"
				src="../../assets/countries/United-States.png" height="64"
				width="64"/>
		</div>
	</div>
</template>

<script>
	import i18n from '../../plugins/vuei18n/i18n'

	export default {
		name: "LanguageSwitcher",
		data() {
			return {
				lang: ''
			}
		},
		methods: {
			changeLang(lang) {
				// console.log('lang', lang)
				i18n.locale = lang
				localStorage.setItem('locale', lang)
				this.lang = lang
				this.$emit('changeLocale')
			}
		}
	}
</script>

<style lang="scss">

	.active {
		padding-top: 1px;
		background-color: #f5f5f5;
		border-radius: 32px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	}

</style>