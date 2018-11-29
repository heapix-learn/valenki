<template>
	<div class="register-page">

		<div class="register-page__spacer"/>

		<v-form @submit="checkFields()" ref="form" v-model="valid" lazy-validation>
			<v-text-field
				v-model="user.email"
				:rules="emailRules"
				label="Email"
				type="email"
				required
			/>
			<v-text-field
				v-model="user.password"
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
	import User from '../../classes/user/User'

	export default {
		name: 'RegisterPagePage',
		components: {},
		data() {
			return {
				user:  new User,
				valid: true,
				confirm_password: '',
				emailRules: [
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
				if (this.user.email.length >= 6) {
					if (this.user.password.length >= 6) {
						if (this.confirm_password.length >= 6) {
							if (this.confirm_password === this.user.password) {
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
						this.user.password = null;
						this.confirm_password = null
					}
				} else {
					console.log('name are too short')
					this.user.email = null
				}
			},
			registerUser() {
				const userRepository = new UserRepository();
				userRepository.createUser(this.user)
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