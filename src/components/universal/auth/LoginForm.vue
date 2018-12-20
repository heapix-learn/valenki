<template>
	<div class="login-page">

		<div class="login-page__spacer"/>

		<div class="login-page__alert">
			<v-alert
				:value="true"
				v-if="status === 'success'"
				color="success"
				icon="check_circle"
				outline
			>
				{{ $t('$general.success_enter') }}
			</v-alert>
		</div>

		<div class="login-page__alert">
			<v-alert
				:value="true"
				v-if="status === 'error'"
				color="error"
				icon="warning"
				outline
			>
				{{ $t('$general.wrong_credentials') }}
			</v-alert>
		</div>

		<v-form
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
				:label="$t('$general.password')"
				type="password"
				required
			/>
			<div class="login-page__form__buttons">
				<v-btn :disabled="!valid" @click="checkFields()" class="login-page__form__buttons__btn">
					{{ $t('$general.sign_in') }}
				</v-btn>

				<router-link :to="{name: 'register-page'}">
					<v-btn>
						{{ $t('$general.register') }}
					</v-btn>
				</router-link>
			</div>
		</v-form>
	</div>
</template>

<script>
	import i18n from '../../../plugins/vuei18n/i18n'
	import UserRepository from '../../../classes/user/UserRepository.js'

	export default {
		name: 'LoginForm',
		components: {},
		data() {
			return {
				credential: {
					email: '',
					password: ''
				},
				valid: true,
				status: '',
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
					this.status = 'success';
					this.goToMain()
				} else {
					this.status = 'error'
				}
			},
			async goToMain() {
				// await (window.location.href = "/")

				setTimeout(() => {
					window.location.href = "/"
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
				const postResponse = await userRepository.signIn(this.credential);
				// console.log('resp', postResponse)
				localStorage.setItem('token', postResponse.data.access_token);
				localStorage.setItem('id', postResponse.data.user.id);
				localStorage.setItem('nick', postResponse.data.user.nick_name);
				i18n.locale = postResponse.data.user.locale
				localStorage.setItem('locale', postResponse.data.user.locale)
				this.checkStatus(postResponse.status)
			}
		}
	}
</script>

<style lang="scss">

	.login-page {
		padding: 5vh;

		&__alert {
			position: absolute;
			margin-left: 10%;
			margin-right: 10%;
			left: 0;
			right: 0;
			top: 12%;
		}

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