<template>
			<div class="login-page">
						<div class="spacer"></div>
						<v-form ref="form" lazy-validation>
									<v-text-field
											v-model="credential.name"
											label="Name/Email"
											required
									></v-text-field>
									<v-text-field
											v-model="credential.password"
											label="Password"
											required
									></v-text-field>
									<div class="login-page__form__buttons">
												<v-btn class="login-page__form__buttons__btn"
												>
															LogIn
												</v-btn>
										<router-link :to="{name: 'RegisterPage'}" class="link">
											<v-btn class="login-page__form__buttons__btn">Register</v-btn>
										</router-link>

									</div>
						</v-form>
						логин:{{credential.name}}<br>
						пароль:{{credential.password}}
			</div>
</template>

<script>

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
		}
	}
</script>

<style lang="scss">
			.login-page {
						padding: 5vh;
			}

			.spacer {
						height: 10vh;
			}

			.login-page {
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