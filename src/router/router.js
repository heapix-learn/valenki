import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../components/authentication/LoginPage";
import RegisterPage from "../components/authentication/RegisterPage";
import BaseMain from "../components/main/BaseMain";
import PersonalPage from "../components/personal/PersonalPage";
import NewMessage from "../components/message/NewMessage";
import UserMessages from "../components/message/UserMessages";


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
		{
			name: "UserMessages",
			path: "/messages/user=",
			component: UserMessages
		}
	]
})

export default router