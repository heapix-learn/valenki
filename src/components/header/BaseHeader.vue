<template>
	<div class="base-header">
		<v-toolbar class="v-toolbar" :dark="false" :fixed="true">
			<router-link :to="{name: 'main'}">
				<img
					class="v-toolbar__logo"
					src="../../assets/logo.png"
					height="37"
					width="246"
				/>
			</router-link>
			<v-spacer/>

			{{userNick}}

			<v-menu offset-y>
				<v-toolbar-side-icon slot="activator">
					<i class="material-icons">
						menu
					</i>
				</v-toolbar-side-icon>
				<v-list class="link">

					<v-list-tile v-if="!userNick">
						<router-link :to="{name: 'login-page'}" class="link">
							<span>Login</span>
						</router-link>
					</v-list-tile>

					<v-list-tile v-if="!userNick">
						<router-link :to="{name: 'register-page'}" class="link">
							<span>Register</span>
						</router-link>
					</v-list-tile>

					<v-list-tile v-if="userNick">
						<router-link :to="{name: 'user-profile'}" class="link">
							<span>Personal</span>
						</router-link>
					</v-list-tile>

					<v-list-tile @click="logOut()" v-if="userNick">
						Logout
					</v-list-tile>
				</v-list>
			</v-menu>

		</v-toolbar>
	</div>
</template>
<script>

	import UserRepository from "../../classes/user/UserRepository";

	export default {
		name: "BaseHeader",
		methods: {
			logOut() {
				localStorage.removeItem('token');
				localStorage.removeItem('nick');
				localStorage.removeItem('id');
				window.location.href = "/"
			}
		},
		computed: {
			userNick() {
				if (localStorage.getItem('nick')) {
					const userRepository = new UserRepository()
					if (userRepository.checkLogin()) {
						return localStorage.getItem('nick')
					} else {
						this.logOut()
						return false
					}
				}
			}
		}
	}

</script>

<style lang="scss">
	@import "../../scss/global.scss";

	.v-toolbar {
		&__logo {
			margin-top: 1vh;
		}
	}

</style>