<template>
	<div class="login-page">

		<div class="login-page__spacer"/>

		<div class="login-page__alert">
			<v-alert
				:value="true"
				v-if="status === 'success'"
				color="success"
				outline
				style="border: none !important;"
			>
				<div class="login-page__alert__message">
					<i class="material-icons">
						check_circle_outline
					</i>
					<span>{{$t('$general.success_enter')}}</span>
				</div>
			</v-alert>
		</div>

		<div class="login-page__alert">
			<v-alert
				:value="true"
				v-if="status === 'error'"
				color="error"
				outline
				style="border: none !important;"
			>
				<div class="login-page__alert__message">
					<i class="material-icons">
						warning
					</i>
					<span>
				{{$t('$general.wrong_credentials')}}</span>
				</div>
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
				<v-btn
					@click="checkFields()"
					:disabled="!valid"
					class="login-page__form__buttons__button">
					{{$t('$general.sign_in')}}
				</v-btn>
				<v-btn class="login-page__form__buttons__button">
					<router-link :to="{name: 'register-page'}">
						{{$t('$general.register')}}
					</router-link>
				</v-btn>
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
				let postResponse = await userRepository.signIn(this.credential);
				if (postResponse.status === 200) {
					this.status = 'success';
					localStorage.setItem('token', postResponse.data.access_token);
					localStorage.setItem('id', postResponse.data.user.id);
					localStorage.setItem('nick', postResponse.data.user.nick_name);
					i18n.locale = postResponse.data.user.locale
					localStorage.setItem('locale', postResponse.data.user.locale)
					this.goToMain()
				} else {
					this.status = 'error'
				}
			}
		}
	}
</script>

<style lang="scss">

	.login-page {
		padding: 1vh;

		&__spacer {
			height: 16vh;
		}

		&__alert {
			border: none;
			margin: 0 1vh;
			border-radius: 3px;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			padding: 0 5px;
			background: #f5f5f5;
			position: absolute;
			left: 0;
			right: 0;
			top: 12%;

			&__message {
				display: flex;
				align-items: center;
				justify-content: center;

				i {
					padding: 0 10px;
				}
			}
		}

		&__form {
			padding: 10px 15px;
			width: 100%;
			background: #f5f5f5;
			border-radius: 3px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

			&__buttons {
				display: flex;
				justify-content: space-evenly;
				align-items: center;

				&__button {
					width: 50% !important;
					margin: 0 !important;
				}
			}
		}
	}

	/*@media screen and (min-width: 768px) {*/
	/*.login-page {*/
	/*justify-content: center;*/

	/*&__form {*/
	/*width: 50%;;*/
	/*}*/
	/*}*/
	/*}*/

</style>