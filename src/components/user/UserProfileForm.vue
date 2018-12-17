<template>
	<div class="personal-page">
		<v-btn
			v-if="personal"
			small
			class="personal-page__button"
			@click="openEdit()"
			:flat="true"
			fab
		>
			<i class="material-icons">
				settings
			</i>
		</v-btn>
		<div v-else class="spacer"></div>
		<div class="personal-page__info">
			<v-avatar :tile="false" :size="130" class="personal-page__info__avatar">
				<img :src="user.avatar" class="round"/>
			</v-avatar>
			<div class="personal-page__info__nickname">
				<h1>{{user.nick_name}}</h1>
			</div>
		</div>

		<div v-if="edit" class="personal-page__edit-area">
			<div class="personal-page__edit-area__avatar-upload">
				<label for="image_upload">Choose avatar:</label>
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

		<div>
			<br>
			<br>
		</div>

		<div v-show="personal">
			<v-tabs
				color="cyan"
				slider-color="yellow"
			>
				<v-tab
					:key="1"
					ripple
				>
					Your messages {{messagesById.length}}
				</v-tab>
				<v-tab
					:key="2"
					ripple
				>
					Saved messages {{messagesSaved.length}}
				</v-tab>
				<v-tab-item
					:key="1"
				>
					<v-card flat color="#d3e3fc">
						<MessageList :Messages="messagesById"/>
					</v-card>
				</v-tab-item>
				<v-tab-item
					:key="2"
				>
					<v-card flat color="#d3e3fc">
						<MessageList :Messages="messagesSaved"/>
					</v-card>
				</v-tab-item>
			</v-tabs>
		</div>
		<!--<MessageList :Messages="messagesById"/>-->
	</div>
</template>

<script>
	import User from '../../classes/user/User'
	import MessageList from '../message/MessageList'
	import UserRepository from '../../classes/user/UserRepository.js'
	import MessageRepository from '../../classes/message/MessageRepository.js'

	export default {
		name: "UserProfileForm",
		components: {MessageList},
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
				messagesById: [],
				messagesSaved: [],
				userId: false,
				personal: false,
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
		created() {
			this.getId()
		},
		methods: {
			async getId() {
				const userRepository = new UserRepository();
				if (this.$route.params.user_id) {
					this.userId = this.$route.params.user_id;
				} else {
					this.userId = (await userRepository.findUsers(this.$route.params.nick_name))[0].id;
				}
				if (this.$route.path.includes('profile') && (this.userId === localStorage.getItem('id'))) {
					this.personal = true
				} else {
					this.personal = false
				}
				this.getUser()
			},
			async getUser() {
				const userRepository = new UserRepository();
				this.user = await (userRepository.getUserById(this.userId))
				this.getMessages()
			},
			async getMessages() {
				const messageRepository = new MessageRepository();
				this.messagesById = await (messageRepository.getMessagesByUser(this.userId))
				this.getSavedMessages()
			},
			async getSavedMessages() {
				if (this.personal) {
					let messagesSavedIndex = [];
					const messageRepository = new MessageRepository();
					messagesSavedIndex = await (messageRepository.getSavedMessages(this.userId))
					messagesSavedIndex.forEach(async (item) => {
						let message = await (messageRepository.getMessageById(item.message_id))
						this.messagesSaved.push(message)
					});
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
							} //else { //	console.log(' new passwords incorrect')	}
						} //else { //	console.log('new password so short')	}
					} //else { //	console.log('old password incorrect')	}
				} //else { // console.log('fields are empty')	}
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
			setAvatar(e) {
				var files = e.target.files || e.dataTransfer.files
				if (!files.length) {
					return
				}
				this.createImage(files[0])
			},
			createImage(file) {
				this.edited = true
				var reader = new FileReader();
				reader.onload = (e) => {
					this.image = e.target.result
					this.user.avatar = this.image
					this.editUser.avatar = this.image
				}
				reader.readAsDataURL(file)
			},
		}
	}
</script>

<style lang="scss">
	@import '../../scss/colors';
	.spacer {
		height: 52px;
	}

	.personal-page {
		background: $blue;

		&__button {
			float: right;
			border: 2px solid #77a6f7;
		}

		&__info {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: space-between;
			border-top: 2px solid darkslategrey;
			border-bottom: 2px solid darkslategrey;
			background-color: lavender;
			height: 40px;

			&__avatar {
				margin-left: 10px;
			}

			&__nickname {
				margin-right: 10px;
				font-weight: 600;
			}

			/*padding: 20px;*/
			/*text-align: center;*/
			/*background-color: turquoise;*/
			/*border-top: 2px solid darkslategrey;*/
			/*border-bottom: 2px solid darkslategrey;*/
		}

		&__buttons-block {
			padding-top: 20px;
			display: flex;
			justify-content: space-evenly;
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