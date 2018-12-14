import Vue from "vue";
import VueRouter from "vue-router";
import User from "../components/personal/User";
import BaseMain from "../components/main/BaseMain";
import Layout from "../components/layout/Layout.vue";
import FindUser from "../components/personal/FindUser";
import NewMessage from "../components/message/NewMessage";
import UserMessages from "../components/message/UserMessages";
import LoginPage from "../components/authentication/LoginPage";
import PersonalPage from "../components/personal/PersonalPage";
import HashtagMessages from "../components/message/HashtagMessages";
import RegisterPage from "../components/authentication/RegisterPage";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: "/",
			name: "Layout",
			component: Layout,
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
					path: "/find-user",
					name: "find-user",
					component: FindUser
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
					path: "/messages/hashtag:hashtag",
					name: "hashtag-messages",
					component: HashtagMessages
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