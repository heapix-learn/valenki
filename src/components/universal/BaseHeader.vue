<template>
	<div class="base-header">
		<v-toolbar class="v-toolbar" :dark="false" :fixed="true">
			<router-link :to="{name: 'base-main'}" class="base-header__logo">
				<img
					class="base-header__logo__image"
					src="../../assets/lemma_new.png"
					height="35"
					width="155"
				/>
			</router-link>
			<v-spacer/>
			<span class="base-header__user-nickname">{{provideNick.name}}</span>
			<Slide right>
				<v-list-tile v-if="provideNick.name">
					<router-link :to="{name: 'find-user'}" class="link">
						<span>{{$t('$general.find_user')}}</span>
					</router-link>
				</v-list-tile>

				<v-list-tile v-if="provideNick.name">
					<router-link :to="{name: 'find-hashtag'}" class="link">
						<span>{{$t('$general.find_hashtag')}}</span>
					</router-link>
				</v-list-tile>

				<v-list-tile v-if="!provideNick.name">
					<router-link :to="{name: 'login-page'}" class="link">
						<span>{{$t('$general.login')}}</span>
					</router-link>
				</v-list-tile>

				<v-list-tile v-if="!provideNick.name">
					<router-link :to="{name: 'register-page'}" class="link">
						<span>{{$t('$general.register')}}</span>
					</router-link>
				</v-list-tile>

				<v-list-tile v-if="provideNick.name">
					<router-link
						:to="{name: 'user-profile', params: {nick_name: provideNick.name, user_id: id}}"
						class="link">
						<span>{{$t('$general.personal')}}</span>
					</router-link>
				</v-list-tile>

				<v-list-tile @click="logOut()" v-if="provideNick.name">
					{{$t('$general.logout')}}
				</v-list-tile>
			</Slide>

			<!--<v-menu class="base-header__menu" transition="slide-x-transition" offset-y>-->
				<!--<v-toolbar-side-icon slot="activator">-->
					<!--<i class="material-icons">-->
						<!--menu-->
					<!--</i>-->
				<!--</v-toolbar-side-icon>-->
				<!--<v-list class="link" >-->

					<!--<v-list-tile v-if="provideNick.name">-->
						<!--<router-link :to="{name: 'find-user'}" class="link">-->
							<!--<span>{{$t('$general.find_user')}}</span>-->
						<!--</router-link>-->
					<!--</v-list-tile>-->

					<!--<v-list-tile v-if="provideNick.name">-->
						<!--<router-link :to="{name: 'find-hashtag'}" class="link">-->
							<!--<span>{{$t('$general.find_hashtag')}}</span>-->
						<!--</router-link>-->
					<!--</v-list-tile>-->

					<!--<v-list-tile v-if="!provideNick.name">-->
						<!--<router-link :to="{name: 'login-page'}" class="link">-->
							<!--<span>{{$t('$general.login')}}</span>-->
						<!--</router-link>-->
					<!--</v-list-tile>-->

					<!--<v-list-tile v-if="!provideNick.name">-->
						<!--<router-link :to="{name: 'register-page'}" class="link">-->
							<!--<span>{{$t('$general.register')}}</span>-->
						<!--</router-link>-->
					<!--</v-list-tile>-->

					<!--<v-list-tile v-if="provideNick.name">-->
						<!--<router-link-->
							<!--:to="{name: 'user-profile', params: {nick_name: provideNick.name, user_id: id}}"-->
							<!--class="link">-->
							<!--<span>{{$t('$general.personal')}}</span>-->
						<!--</router-link>-->
					<!--</v-list-tile>-->

					<!--<v-list-tile @click="logOut()" v-if="provideNick.name">-->
						<!--{{$t('$general.logout')}}-->
					<!--</v-list-tile>-->

				<!--</v-list>-->
			<!--</v-menu>-->

		</v-toolbar>
	</div>
</template>

<script>
	import { Slide } from 'vue-burger-menu'

	export default {
		name: "BaseHeader",
		components: {
			Slide
		},
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
			}
		},
		inject: ['provideNick']
	}

</script>

<style lang="scss">
	@import "../../scss/global";

	.base-header {

		&__logo {
			&__image {
				margin-top: 5px;
			}
		}
		&__user-nickname {
			margin-right: 10%;
		}
	}
	.bm-menu {
		height: 100vh;
		width: 0;
		position: fixed;
		z-index: 1000;
		color: white;
		background-color: #77a6f7;
		overflow-x: hidden;
		padding-top: 60px;
		transition: .5s;
	}
	.bm-burger-button {
		top: 17px;
		right: 15px !important;
		position: fixed;
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
	.cross-style {
		position: absolute;
		top: 20px;
		cursor: pointer;
	}

</style>