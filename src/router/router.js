import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../components/register/LoginPage'
import RegisterPage from '../components/register/RegisterPage'
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
		},
		{
			name: 'LoginPage',
			path: '/login',
			component: LoginPage
		},
		{
			name: 'RegisterPage',
			path: '/register',
			component: RegisterPage
		},
		{
			path: '/help',
			name: 'Help',
			component: Help
		},
	]
})

export default router