import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/register/LoginPage'
import Help from '../components/register/Help'
import BaseMain from '../components/main/BaseMain'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: BaseMain,
			name: 'BaseMain',
			children: []
		}, {
			name: 'LoginForm',
			path: '/login',
			component: Login
		}, {
			path: '/help',
			name: 'Help',
			component: Help
		},
	]
})

export default router