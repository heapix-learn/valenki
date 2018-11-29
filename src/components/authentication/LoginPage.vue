<template>
	<div class="login-page">

		<div class="login-page__alert">
			<v-alert
				:value="true"
				v-if="status.success"
				color="success"
				icon="check_circle"
				outline
			>
				You have successfully logged in!
			</v-alert>
		</div>

		<div class="login-page__alert">
			<v-alert
				:value="true"
				v-if="status.error"
				color="error"
				icon="warning"
				outline
			>
				Wrong email or password!
			</v-alert>
		</div>

		<v-form
			@submit="checkFields()"
			ref="form"
			v-model="valid"
			class="login-page__form"
			lazy-validation
		>
			<v-text-field
				v-model="credential.email"
				:rules="emailRules"
				label="Email"
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
				<v-btn :disabled="!valid" type="submit" class="login-page__form__buttons__btn">
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
					email: '',
					password: ''
				},
				valid: true,
				status: {
					success: false,
					error: false
				},
				emailRules:
					[
						v => !!v || 'Email is required', //must be learn how it's works
						v => (v && v.length >= 6) || 'Email must be more or equal than 6 characters'
					],
				passwordRules:
					[
						v => !!v || 'Password is required',
						v => (v && v.length >= 6) || 'Password must be more or equal than 6 characters'
					],
			}
		},
		methods: {
			checkStatus(status) {
				if (status === 200) {
					this.status.error = false;
					this.status.success = true;
					this.goToMain()
				} else {
					this.status.error = true
				}
			},
			goToMain() {
				setTimeout(() => {
					this.$router.push({name: 'BaseMain'});
				}, 2000);
			},
			checkFields() {
				if (this.credential.email.length >= 6) {
					if (this.credential.password.length >= 6) {
						// console.log('credentials are valid');
						this.signIn();
					} else {
						// console.log('password are too short');
						this.credential.password = null
					}
				} else {
					// console.log('email are too short');
					this.credential.email = null
				}
			},
			async signIn() {
				const userRepository = new UserRepository();
				this.status.success = false;
				this.status.error = true;
				const postResponse = await userRepository.signIn(this.credential);
				localStorage.setItem('token', postResponse.data.access_token);
				localStorage.setItem('id', postResponse.data.user.id);
				localStorage.setItem('nick', postResponse.data.user.nick_name);
				this.checkStatus(postResponse.status)
			}
		}
	}
</script>

<style lang="scss">
	.login-page__alert {
		position: absolute;
		margin-left: 10%;
		margin-right: 10%;
		left: 0;
		right: 0;
		top: 20%;
	}

	.login-page {
		display: flex;
		align-items: center;
		padding: 5vh;

		&__spacer {
			height: 10vh;
		}

		&__form {
			width: 100%;

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

	@media screen and (min-width: 768px) {
		.login-page {
			justify-content: center;

			&__form {
				width: 50%;;
			}
		}
	}

</style>