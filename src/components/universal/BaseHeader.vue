<template>
	<div class="base-header">
		<v-toolbar class="v-toolbar" :dark="false" :fixed="true">
			<router-link :to="{name: 'base-main'}">
				<img
					class="base-header__logo"
					src="../../assets/lemma_new.png"
					height="51"
					width="225"
				/>
			</router-link>

			<v-spacer/>

			{{provideNick.name}}

			<v-menu offset-y>
				<v-toolbar-side-icon slot="activator">
					<i class="material-icons">
						menu
					</i>
				</v-toolbar-side-icon>
				<v-list class="link">

					<v-list-tile v-if="userNick">
						<router-link :to="{name: 'find-user'}" class="link">
							<span>{{ $t('$general.fund_user') }}</span>
						</router-link>
					</v-list-tile>

					<v-list-tile v-if="!userNick">
						<router-link :to="{name: 'login-page'}" class="link">
							<span>{{ $t('$general.login') }}</span>
						</router-link>
					</v-list-tile>

					<v-list-tile v-if="!userNick">
						<router-link :to="{name: 'register-page'}" class="link">
							<span>{{ $t('$general.register') }}</span>
						</router-link>
					</v-list-tile>

					<v-list-tile v-if="userNick">
						<router-link :to="{name: 'user-profile', params: {nick_name: userNick, user_id: id}}" class="link">
							<span>{{ $t('$general.personal') }}</span>
						</router-link>
					</v-list-tile>

					<v-list-tile @click="logOut()" v-if="userNick">
						{{ $t('$general.logout') }}
					</v-list-tile>
				</v-list>
			</v-menu>

		</v-toolbar>
	</div>
</template>

<script>
	import UserRepository from "../../classes/user/UserRepository";

	export default {
		name: "BaseHeader",
		data() {
			return {
				id: 0
		}
		},
		methods: {
			logOut() {
				localStorage.removeItem('token');
				localStorage.removeItem('nick');
				localStorage.removeItem('id');
				window.location.href = "/"
			},
			getId() {
				this.id = localStorage.getItem('id');
			}
		},
		inject: ['provideNick'],
		computed: {
			userNick() {
				if (localStorage.getItem('nick')) {
					const userRepository = new UserRepository();
					if (userRepository.checkLogin()) {
						this.getId();
						return localStorage.getItem('nick')
					} else {
						this.logOut();
						return false
					}
				}
			}
		}
	}

</script>

<style lang="scss">
	@import "../../scss/global";
.base-header {

	&__logo {
		margin-top: 5px;
	}
	.v-toolbar {

	}
}
</style>