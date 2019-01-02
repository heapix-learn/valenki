import Vue from 'vue';
import VueI18n from 'vue-i18n'
import en from '../../translations/en'
import ru from '../../translations/ru'

Vue.use(VueI18n)

let messages = {
	en,
	ru
}

let locale = localStorage.getItem('locale')
if (!locale) {
	locale = 'en'
}
localStorage.setItem('locale', locale)

export default new VueI18n({
	locale,
	messages
})