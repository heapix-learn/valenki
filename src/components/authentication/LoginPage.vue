<template>
	<div class="login-page">

		<div class="login-page__spacer"/>

		<v-form @submit="checkFields()" ref="form" v-model="valid"
						class="login-page__form" lazy-validation>
			<v-text-field
				v-model="credential.name"
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
			<div class="login-page__form__buttons">
				<v-btn type="submit" class="login-page__form__buttons__btn"
							 :disabled="!valid">
					Signin
				</v-btn>

				<router-link :to="{name: 'RegisterPage'}">
					<v-btn>
						Register
					</v-btn>
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
				},
				valid: true,
				nameRules: [
					v => !!v || 'Name is required', //must be learn how it's works
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
				if (this.credential.name.length >= 6) {
					if (this.credential.password.length >= 6) {
						console.log('credentials are correct, you will be logged in');
						this.signIn();
					} else {
						console.log('password are too short');
						this.credential.password = null
					}
				} else {
					console.log('name are too short');
					this.credential.name = null
				}
			},
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
					width: 20%;
				}
			}
		}
	}

</style>