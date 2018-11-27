<template>
	<div class="register-page">

		<div class="register-page__spacer"/>

		<v-form ref="form" lazy-validation>
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
			<v-text-field
				v-model="confirm_password"
				label="Confirm Password"
				required
			/>
			<div class="login-page__form__buttons">
				<v-btn @click="checkFields()" class="login-page__form__buttons__btn">
					Register Me
				</v-btn>
				<router-link :to="{name: 'LoginPage'}">
					<v-btn>already have an account</v-btn>
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
					name: '',
					password: ''
				},
				confirm_password: ''
			}
		},
		methods: {
			checkFields() {
				if ( this.credential.name.length >= 6 ) {
					if (this.credential.password.length >= 6 && this.confirm_password.length >= 6) {
						if (this.confirm_password == this.credential.password) {
							console.log('credentials are correct');
							this.registerUser();
						} else {
							console.log('passwords are not the same')
						}
					} else {
						console.log('password are too short')
					}
				} else {
					console.log('email are too short')
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
				display: flex;
				justify-content: space-evenly;
				align-items: center;

				&__btn {
					width: 33%;
				}
			}
		}
	}
</style>