import Vue from "vue";
import VueRouter from "vue-router";
import User from "../components/personal/User";
import BaseMain from "../components/main/BaseMain";
import Layout from "../components/layout/Layout.vue";
import NewMessage from "../components/message/NewMessage";
import UserMessages from "../components/message/UserMessages";
import LoginPage from "../components/authentication/LoginPage";
import PersonalPage from "../components/personal/PersonalPage";
import RegisterPage from "../components/authentication/RegisterPage";



Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: "/",
			component: Layout,
			name: "Layout",
			children: [
				{
					path: '',
					name: "main",
					component: BaseMain
				},
				{
					path: "/login",
					name: "login-page",
					component: LoginPage
				},
				{
					path: "/register",
					name: "register-page",
					component: RegisterPage
				},
				{
					path: "/users/@:nick_name",
					name: "user",
					component: User,
					children: [
						{
							path: "profile",
							name: "user-profile",
							component: PersonalPage
						},
						{
							path: "messages",
							name: "user-messages",
							component: UserMessages
						}
					]
				},
				{
					path: "/messages/new_message",
					name: "NewMessage",
					component: NewMessage
				},

			]
		}
	]
})

export default router