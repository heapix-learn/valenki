<template>
	<div class="personal-page">
		<v-avatar :tile="false" :size="130"
							class="base-main__page__cart__avatar">
			<img :src="imgPath"/>
		</v-avatar>
		<br>
		<v-btn
			v-if="loggedUser()"
			small
			class="personal-page__button"
			@click="edit=true"
		>
			<i class="material-icons">
				settings
			</i>
		</v-btn>
		user - {{user}}
		<div class="personal-page__nickname">
			<h1>{{user}}</h1>
		</div>
		<div v-if="edit">
			Enter Your Nickname here:
			<v-text-field
				v-model="user.nick_name"
				label="Enter Your NickName"
				type="text"
			/>
			if you want to change your password, fill next:
			<v-text-field
				v-model="old_password"
				label="Enter Old Password"
				type="password"
			/>
			<v-text-field
				v-model="new_password"
				label="Enter New Password"
				type="password"
			/>
			<v-text-field
				v-model="confirm_new_password"
				label="Confirm New Password"
				type="password"
				required
			/>

			<v-btn @click="edit=false">Save</v-btn>
		</div>
		<br>

	</div>
</template>

<script>
	import UserRepository from '../../classes/user/UserRepository.js'
	import User from '../../classes/user/User'

	export default {
		name: "PersonalPage",
		components: {},
		data() {
			return {
				user: {
					type: User,
					required: true
				},
				edit: false,
				new_password: '',
				old_password: '',
				confirm_new_password: ''
			}
		},
		props: {
			id: Number
		},
		computed: {
			imgPath() {
				return require('../../assets/' + localStorage.getItem('id') + '.png')
			}
		},
		created() {
			this.getUser()
		},
		methods: {
			async getUser() {
				const id = this.$route.params.user_id;
				const userRepository = new UserRepository();
				this.user = await (userRepository.getUserById(id))
			},
			async changePassword() {
				if (this.old_password === this.old_password) {
					const userRepository = new UserRepository()
					this.user = await (userRepository.changePassword(this.new_password))
				}
			},
			loggedUser() {
				if (this.$route.path.includes('profile') && (this.$route.params.user_id === localStorage.getItem('id'))) {
					return true
				} else {
					return false
				}
			}
		}
	}
</script>

<style lang="scss">

	.personal-page {
		background: slategray;
		height: 40%;

		&__button {
			float: right;
		}

		&__avatar {
		}

		&__nickname {
			padding: 20px;
			margin-top: 5vh;
			border-top: 2px solid darkslategrey;
			border-bottom: 2px solid darkslategrey;
			text-align: center;
			background-color: lavender;
		}

		&__info {
			padding: 20px;
			text-align: center;
			background-color: turquoise;
			border-top: 2px solid darkslategrey;
			border-bottom: 2px solid darkslategrey;
		}
	}

</style>