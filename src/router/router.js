import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../components/authentication/LoginPage";
import RegisterPage from "../components/authentication/RegisterPage";
import BaseMain from "../components/main/BaseMain";
import PersonalPage from "../components/personal/PersonalPage";
import NewMessage from "../components/message/NewMessage";


Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: "/",
			component: BaseMain,
			name: "BaseMain",
			children: []
		},
		{
			name: "LoginPage",
			path: "/login",
			component: LoginPage
		},
		{
			name: "RegisterPage",
			path: "/register",
			component: RegisterPage
		},
		{
			name: "Personal",
			path: "/personal",
			component: PersonalPage
		},
		{
			name: "NewMessage",
			path: "/new_message",
			component: NewMessage
		},
	]
})

export default router