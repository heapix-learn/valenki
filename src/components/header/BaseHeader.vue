<template>
	<v-toolbar class="v-toolbar" :dark="false" :fixed="true">
		<router-link :to="{name: 'BaseMain'}">
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

				<v-list-tile>
					<router-link :to="{name: 'LoginPage'}" class="link">
						<span>Login</span>
					</router-link>
				</v-list-tile>

				<v-list-tile>
					<router-link :to="{name: 'RegisterPage'}" class="link">
						<span>Register</span>
					</router-link>
				</v-list-tile>

				<v-list-tile>
					<router-link :to="{name: 'Personal'}" class="link">
						<span>Personal</span>
					</router-link>
				</v-list-tile>

				<v-list-tile @click="logOut()">
					Logout
				</v-list-tile>
			</v-list>
		</v-menu>

	</v-toolbar>
</template>

<script>

	export default {
		name: "BaseHeader",
		methods: {
			logOut() {

				localStorage.removeItem('token');
				localStorage.removeItem('nick');
				localStorage.removeItem('id')
				window.location.pathname = "/login"
			}
		},
		computed: {
			userNick() {
				return localStorage.getItem('nick');
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