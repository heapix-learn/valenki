import Vue from "vue";
import VueRouter from "vue-router";
import User from "../components/user/User";
import Layout from "../components/layout/Layout.vue";
import FindUser from "../components/user/UserSearchForm";
import BaseMain from "../components/universal/BaseMain";
import LoginUserForm from "../components/universal/auth/LoginForm";
import MessageByUser from "../components/message/MessageByUser";
import UserProfileForm from "../components/user/UserProfileForm";
import MessageCreateForm from "../components/message/MessageCreateForm";
import RegisterPage from "../components/universal/auth/RegisterForm";
import MessageByHashtag from "../components/message/MessageByHashtag";

Vue.use(VueRouter);

const router = new VueRouter({
	linkActiveClass: 'li',
	linkExactActiveClass: 'li',
	mode: 'history',
	routes: [
		{
			path: "/",
			name: "Layout",
			component: Layout,
			children: [
				{
					path: '',
					name: "base-main",
					component: BaseMain
				},
				{
					path: "/login",
					name: "login-page",
					component: LoginUserForm
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
							component: UserProfileForm
						},
						{
							path: "messages",
							name: "user-messages",
							component: MessageByUser
						}
					]
				},
				{
					path: "/messages/hashtag:hashtag",
					name: "hashtag-messages",
					component: MessageByHashtag
				},
				{
					path: "/messages/new_message",
					name: "MessageCreateForm",
					component: MessageCreateForm
				},
			]
		}
	]
})

export default router