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
				:label="$t('$general.password')"
				type="password"
				required
			/>
			<v-text-field
				v-model="confirm_password"
				:rules="passwordRules"
				:label="$t('$general.confirm_pass')"
				type="password"
				required
			/>
			<div class="login-page__form__buttons">
				<v-btn
					type="submit"
					class="login-page__form__buttons__button"
					:disabled="!valid"
				>
					{{ $t('$general.sign_up') }}
				</v-btn>
				<router-link
					:to="{name: 'login-page'}"
					class="login-page__form__buttons__button"
				>
					<v-btn>{{ $t('$general.have_account') }}</v-btn>
				</router-link>
			</div>
		</v-form>
		<SetLanguage/>
	</div>
</template>

<script>
	import User from '../../../classes/user/User'
	import UserMapper from '../../../classes/user/UserMapper'
	import UserRepository from '../../../classes/user/UserRepository.js'
	import SetLanguage from '../LanguageSwitcher'

	export default {
		name: 'RegisterForm',
		components: { SetLanguage },
		data() {
			return {
				user: new User,
				valid: true,
				confirm_password: '',
				emailRules: [
					v => !!v || 'Email is incorrect', //must be learn how its works
					v => (v && v.length >= 6) || '\n' + 'Email must contain 6 characters'
				],
				passwordRules: [
					v => !!v || 'Password is required',
					v => (v && v.length >= 6) || 'Password must contain 6 characters'
				],
			}
		},
		methods: {
			checkFields() {
				// eslint-disable-next-line
				let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if (reg.test(this.user.email) === true) {
					if (this.user.password.length >= 6) {
						if (this.confirm_password.length >= 6) {
							if (this.confirm_password === this.user.password) {
								console.log('credentials are correct, you have been registered');
								this.user.locale = localStorage.getItem('locale');
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
					console.log('email are incorrect')
					this.user.email = null
				}
			},
			registerUser() {
				const userRepository = new UserRepository();
				userRepository.createUser(UserMapper.map(this.user))
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

		&__pick-langs {
			padding-top: 10px;
			display: flex;
			justify-content: space-around;
		}
	}
</style>