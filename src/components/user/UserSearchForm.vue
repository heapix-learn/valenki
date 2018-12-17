<template>
	<div class="find-user">
		<v-form
			ref="form"
			class="find-iser__form"
		>
			<v-text-field
				v-model="user_name"
				label="Enter user name here"
				type="text"
				required
			/>
			<v-btn class="find-user__btn" @click="findUsers()">
				Find
			</v-btn>
		</v-form>

		<div v-if="Users.length">
				<span>
					Perhaps, these are the people you were looking for:
				</span>
			<div v-for="(user, index) in Users" :key="index">
				<router-link
					class="message-item__info__title__nickname"
					:to="{name: 'user-messages', params: {nick_name: user.nick_name, user_id: user.id}}">
					<div class="find-user__cards">{{index+1}}. {{user.nick_name}}</div>
				</router-link>
			</div>
		</div>
		<p>{{ $t('$general.menu') }}</p>
		<p>{{ $t('$general.login') }}</p>
		<p>{{ $t('$general.register') }}</p>
		<v-btn @click="changeLang()"></v-btn>
	</div>
</template>

<script>

	import UserRepository from "../../classes/user/UserRepository";
	import i18n from '../../plugins/vuei18n/i18n'


	export default {
		name: "UserSearchForm",
		data() {
			return {
				user_name: '',
				Users: {
					type: Array
				},
			}
		},
		methods: {
			async findUsers() {
				const userRepository = new UserRepository();
				this.Users = await userRepository.findUsers(this.user_name);
			},
			changeLang() {
				i18n.locale = "ru"
			}
		}
	}
</script>

<style lang="scss">

	.find-user {
		background-color: #D3E3FC;

		&__form {
			display: flex;
			padding: 10px;
		}

		&__cards {
			border: 2px solid #77A6F7;
			border-radius: 5px;
		}

		&__cards:hover {
			border: 2px solid #00887A;
			border-radius: 5px;
		}

		& __btn {
		}

	}
</style>