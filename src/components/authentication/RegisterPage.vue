<template>
	<div class="register-page">

		<div class="register-page__spacer"/>

		<v-form @submit="checkFields()" ref="form" v-model="valid" lazy-validation>
			<v-text-field
				v-model="credential.login"
				:rules="nameRules"
				label="Name/Email"
				type="text"
				required
			/>
			<v-text-field
				v-model="credential.password"
				:rules="passwordRules"
				label="Password"
				type="password"
				required
			/>
			<v-text-field
				v-model="confirm_password"
				:rules="passwordRules"
				label="Confirm Password"
				type="password"
				required
			/>
			<div class="login-page__form__buttons">
				<v-btn
					type="submit"
					class="login-page__form__buttons__button"
					:disabled="!valid"
				>
					Signup
				</v-btn>
				<router-link
					:to="{name: 'LoginPage'}"
					class="login-page__form__buttons__button"
				>
					<v-btn>have an account</v-btn>
				</router-link>
			</div>
		</v-form>

	</div>
</template>

<script>
	import UserRepository from '../../classes/user/UserRepository.js'

	export default {
		name: 'RegisterPagePage',
		components: {},
		data() {
			return {
				credential: {
					login: '',
					password: ''
				},
				valid: true,
				confirm_password: '',
				nameRules: [
					v => !!v || 'Name is required', //must be learn how its works
					v => (v && v.length >= 6) || 'Name must be more or equal than 6 characters'
				],
				passwordRules: [
					v => !!v || 'Password is required',
					v => (v && v.length >= 6) || 'Password must be more or equal than 6 characters'
				],
			}
		},
		methods: {
			checkFields() {
				if (this.credential.login.length >= 6) {
					if (this.credential.password.length >= 6) {
						if (this.confirm_password.length >= 6) {
							if (this.confirm_password == this.credential.password) {
								console.log('credentials are correct, you have been registered');
								this.registerUser();
							} else {
								console.log('passwords are not the same');
								this.confirm_password = null
							}
						} else {
							console.log('password are too short');
							this.confirm_password = null
						}
					} else {
						console.log('password are too short');
						this.credential.password = null;
						this.confirm_password = null
					}
				} else {
					console.log('name are too short')
					this.credential.login = null
				}
			},
			registerUser() {
				const userRepository = new UserRepository();
				userRepository.createUser(this.credential)
			}
		}
	}
</script>

<style lang="scss">

	.register-page {
		padding: 5vh;

		&__spacer {
			height: 10vh;
		}

		&__form {

			&__buttons {


				&__button {
				}
			}
		}
	}
</style>