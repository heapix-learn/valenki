import Vue from "vue";
import VueRouter from "vue-router";
import User from "../components/personal/User";
import Layout from "../components/layout/Layout.vue";
import FindUser from "../components/personal/FindUser";
import BaseMain from "../components/universal/BaseMain";
import LoginUserForm from "../components/personal/LoginUserForm";
import MessageByUser from "../components/message/MessageByUser";
import PersonalPage from "../components/personal/PersonalPage";
import MessageCreateForm from "../components/message/MessageCreateForm";
import RegisterPage from "../components/personal/RegisterUserForm";
import MessageByHashtag from "../components/message/MessageByHashtag";

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
					name: "universal",
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
							component: PersonalPage
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