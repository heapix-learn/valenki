<template>
	<div class="login-page">

		<div class="login-page__spacer"/>

		<v-form class="login-page__form" ref="form" lazy-validation>
			<v-text-field
				v-model="credential.name"
				label="Name/Email"
				required
			/>
			<v-text-field
				v-model="credential.password"
				label="Password"
				required
			/>
			<div class="login-page__form__buttons">
				<v-btn @click="signIn()" class="login-page__form__buttons__btn">
					LogIn
				</v-btn>

				<router-link :to="{name: 'RegisterPage'}">
					<v-btn>Register</v-btn>
				</router-link>
			</div>
		</v-form>

	</div>
</template>

<script>
	import UserRepository from '../../classes/user/UserRepository.js'

	export default {
		name: 'LoginPage',
		components: {},
		data() {
			return {
				credential: {
					name: '',
					password: ''
				}
			}
		},
		methods: {
			async signIn() {
				const userRepository = new UserRepository();
				const token = await userRepository.signIn(this.credential);
				localStorage.setItem('token', token)
			}
		}
	}
</script>

<style lang="scss">

	.login-page {
		padding: 5vh;

		&__spacer {
			height: 10vh;
		}

		&__form {

			&__buttons {
				display: flex;
				justify-content: space-evenly;
				align-items: center;

				&__btn {
					width: 40%;
				}
			}
		}
	}

</style>