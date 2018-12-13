<template>
	<div class="personal-page">
		<v-avatar :tile="false" :size="130"
							class="base-main__page__cart__avatar">
			<img :src="user.avatar" class="round"/>
		</v-avatar>
		<br>
		<v-btn
			v-if="loggedUser()"
			small
			class="personal-page__button"
			@click="openEdit()"
		>
			<i class="material-icons">
				settings
			</i>
		</v-btn>
		User: {{user.nick_name}}
		<div class="personal-page__nickname">
			<h1></h1>
			<h1></h1>
		</div>
		<div v-if="edit" class="personal-page__edit-area">
			<div class="personal-page__edit-area__avatar-upload">
			<label for="image_upload" >Choose avatar:</label>
			<input id="image_upload" type="file" @change="setAvatar">
			</div>
			Enter Your Nickname here:
			<v-text-field
				v-model="editUser.nick_name"
				label="Enter Your NickName"
				type="text"
			/>
			if you want to change your password, fill next:
			<v-text-field
				v-model="old_password"
				:rules="passwordRules"
				label="Enter Old Password"
				type="text"

			/>
			<v-text-field
				v-model="new_password"
				:rules="passwordRules"
				label="Enter New Password"
				type="text"
			/>
			<v-text-field
				v-model="confirm_new_password"
				:rules="passwordRules"
				label="Confirm New Password"
				type="text"
				required
			/>

			<v-btn @click="saveEditUser()">Save</v-btn>
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
				editUser: {
					type: User,
					required: true
				},
				edit: false,
				edited: false,
				new_password: '',
				old_password: '',
				confirm_new_password: '',
				passwordRules: [
					v => !!v || 'Password is required',
					v => (v && v.length >= 6) || 'Password must contain 6 characters'
				],
			}
		},
		inject: ['provideNick'],
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
			loggedUser() {
				if (this.$route.path.includes('profile') && (this.$route.params.user_id === localStorage.getItem('id'))) {
					return true
				} else {
					return false
				}
			},
			openEdit() {
				this.edit = (this.edit) ? false : true
				for (let key in this.user) {
					this.editUser[key] = this.user[key]
				}
			},
			async saveEditUser() {
				if (this.old_password || this.new_password || this.confirm_new_password) {
					if (this.old_password === this.user.password) { //	console.log('old password correct')
						if (this.new_password.length > 5) {
							if (this.new_password === this.confirm_new_password) { //	console.log(' new passwords are correct')
								this.editUser.password = this.new_password
							} else { //	console.log(' new passwords incorrect')
							}
						} else { //	console.log('new password so short')
						}
					} else { //	console.log('old password incorrect')
					}
				} else { // console.log('fields are empty')
				}
				for (let key in this.user) {
					if (this.editUser[key] != this.user[key]) {
						this.edited = true
					}
				}
				if (this.edited) {
					const userRepository = new UserRepository();
					let response = await (userRepository.editUser(this.editUser));
					if (response === 200) {
						console.log('response = ', response);
						await this.getUser();
						localStorage.setItem('nick', this.user.nick_name)
						this.provideNick.name = localStorage.getItem('nick')
					}
				} else {
					console.log('you have changed nothing')
				}
			},
			setAvatar (e) {
				var files = e.target.files || e.dataTransfer.files
				if (!files.length) {
					return
				}
				this.createImage(files[0])
			},
			createImage (file) {
				this.edited = true
				var reader = new FileReader();
				reader.onload = (e) => {
					this.image = e.target.result
					this.user.avatar = this.image
					this.editUser.avatar = this.image
				}
				reader.readAsDataURL(file)
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

		&__edit-area {
			padding: 0 10px;
			&__avatar-upload {
				display: flex;
				justify-content: center;
				padding: 10px;
			}
		}
	}

</style>