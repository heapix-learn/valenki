import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import 'vuetify/dist/vuetify.min.css';
import i18n from './plugins/vuei18n/i18n'
import InfiniteScroll from 'v-infinite-scroll';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

Vue.use(VueI18n)
Vue.use(VueRouter);
Vue.use(InfiniteScroll);

Vue.use(Vuetify, {
	iconfont: 'mdi'
});

new Vue({
	i18n,
	VueRouter,
	render: h => h(App)
}).$mount('#app');