import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/register/LoginPage'
import Help from '@/components/register/Help'
import Layout from '@/components/layout/Layout'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
      {
        path: '/',
        component: Layout,
        children: [
          {
            path: '/login',
            component: Login
          }
        ]
      },
      {
        path: '/help',
        name: 'Help',
        component: Help
      },
    ]
  })