import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
// import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import 'vuetify/dist/vuetify.min.css';
import InfiniteScroll from 'v-infinite-scroll';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(InfiniteScroll);

Vue.use(Vuetify, {
  iconfont: 'mdi'
 });
new Vue({
    VueRouter,
  render: h => h(App)
}).$mount('#app');