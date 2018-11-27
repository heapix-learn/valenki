import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../components/authentication/LoginPage";
import RegisterPage from "../components/authentication/RegisterPage";
import Help from "../components/authentication/Help";
import BaseMain from "../components/main/BaseMain";

Vue.use(VueRouter);

const router = new VueRouter({
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
			path: "/authentication",
			component: RegisterPage
		},
		{
			path: "/help",
			name: "Help",
			component: Help
		},
	]
})

export default router