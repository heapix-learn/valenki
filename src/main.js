import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router';
import 'vuetify/dist/vuetify.min.css';
import InfiniteScroll from 'v-infinite-scroll';
import 'material-design-icons-iconfont/dist/material-design-icons.css';



Vue.config.productionTip = false;

Vue.use(VueI18n)
Vue.use(VueRouter);
Vue.use(InfiniteScroll);

const config = {
  en: ['text'],
  ru: ['text'],
}

let messages = {}
for (let lang in config) {
  let bag = {}
  config[lang].forEach(function (fileName) {
    let txt = require(`./components/lang/langs/${lang}/${fileName}.json`)
    bag[fileName] = txt
  })
  messages[lang] = bag
}

let locale = navigator.language.split('-')[0]
console.log('Language "', locale, '"')

const i18n = new VueI18n({
  locale,
  messages
})

Vue.use(Vuetify, {
  iconfont: 'mdi'
 });
new Vue({
  i18n,
    VueRouter,
  render: h => h(App)
}).$mount('#app');