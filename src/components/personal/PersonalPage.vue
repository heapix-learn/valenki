<template>
	<div class="personal-page">
		<v-avatar :tile="false" :size="130"
							class="base-main__page__cart__avatar">
			<img :src="imgPath"/>
		</v-avatar>
		<br>
		<!--<v-btn small class="personal-page__button" @click="edit=true">-->
		<!--<i class="material-icons">-->
		<!--settings-->
		<!--</i>-->
		<!--</v-btn>-->
		<div class="personal-page__nickname">
			<h1>{{User.nick_name}}</h1>
		</div>
		<!--<div class="personal-page__nickname">-->
		<!--<h1>Your email: {{User.email}}</h1>-->
		<!--</div>-->
		<div v-if="edit">
			Enter Your Nickname here:
			<v-text-field
				v-model="User.nick_name"
				:rules="passwordRules"
				label="Enter Your NickName"
				type="text"
				required
			/>
			if you want to change your password, fill next:
			<v-text-field
				v-model="old_password"
				:rules="passwordRules"
				label="Enter Old Password"
				type="password"
				required
			/>
			<v-text-field
				v-model="new_password"
				:rules="passwordRules"
				label="Enter New Password"
				type="password"
				required
			/>
			<v-text-field
				v-model="confirm_new_password"
				:rules="passwordRules"
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

	export default {
		name: "PersonalPage",
		components: {},
		data() {
			return {
				User: {},
				edit: false,
				new_password: '',
				old_password: '',
				conf_new_password: ''
			}
		},
		props: {
			id: Number
		},
		computed: {
			imgPath() {
				console.log('id from prev page', this.id)
				return require('../../assets/' + this.id + '.png')
			}
		},
		created() {
			this.getUser(this.id)
		},
		methods: {
			async getUser(id) {
				const userRepository = new UserRepository()
				this.User = await (userRepository.getUserById(id))
			},
			async changePassword() {
				if (this.old_password === this.old_password) {
					const userRepository = new UserRepository()
					this.User = await (userRepository.changePassword(this.new_password))
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