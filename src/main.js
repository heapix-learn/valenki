import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(VueRouter);

Vue.use(Vuetify, {
  iconfont: 'mdi'
 });
new Vue({
    VueRouter,
  render: h => h(App),
}).$mount('#app')
