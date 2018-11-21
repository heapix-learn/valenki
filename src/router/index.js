import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/register/LoginPage'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        name: 'BodyComponent',
        component: BodyComponent,
        children: [
          {
            path: '/login',
            name: 'LoginPage',
            component: Login
          }
        ]
      },
    ]
  })