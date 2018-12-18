<template>
	<div class="new-message">
		<!--{{typeof date}}-->
		<!--message {{message}}-->
		<v-textarea
			:counter="140"
			outline
			height="150"
			autofocus
			background-color="blue"
			validate-on-blur
			label="Write your message there:"
			v-model="message.phrase"
		></v-textarea>
kartinka - {{message.picture}}
		<div class="personal-page__edit-area__avatar-upload">
			<input id="image_upload" type="file" @change="addPicture">
		</div>
		<img src="message.avatar" alt="">
		<div class="new-message__buttons">
			<v-btn flat icon outline color="blue">
				<i class="material-icons">
					add_photo_alternate
				</i>
			</v-btn>
			<v-btn flat icon outline color="green">
				<i class="material-icons">
					gif
				</i>
			</v-btn>
			<v-btn flat icon outline color="orange">
				<i class="material-icons">
					sentiment_satisfied_alt
				</i>
			</v-btn>
		</div>

		<div class="new-message__add-message-button">
			<v-btn
				fixed
				dark
				fab
				:no-resize="true"
				color="red"
				@click="checkFields()"
			>
				<i class="material-icons">
					create
				</i>
			</v-btn>
		</div>

	</div>
</template>

<script>
	import MessageRepository from '../../classes/message/MessageRepository.js';
	import MessageMapper from '../../classes/message/MessageMapper'
	import Message from '../../classes/message/Message'

	export default {
		name: "MessageCreateForm",
		data() {
			return {
				message: new Message,
				date: {}
			}
		},

		methods: {
			checkFields() {
				this.message.author_id = localStorage.getItem('id');
				this.message.author_nick = localStorage.getItem('nick');
				this.message.created = this.getDate();
				if (this.message.phrase.length && this.message.author_id) {
					this.createMessage()
				} else {
					console.log('Вы ничего не написали =(')
				}
			},
			createMessage() {
				const messageRepository = new MessageRepository();
				messageRepository.createMessage(MessageMapper.map(this.message));
			},
			getDate () {
				let d = new Date();

				let dd = d.getDate();
				if (dd < 10) { dd = '0' + dd;
					}
				let mm = d.getMonth() + 1;
				if (mm < 10) { mm = '0' + mm; }

				let yy = d.getFullYear() % 100;
				if (yy < 10) { yy = '0' + yy; }

				return dd + '.' + mm + '.' + yy;
			},
			addPicture(e) {
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
					this.message.picture = this.image
				}
				reader.readAsDataURL(file)
			},
		}
	}
</script>

<style lang="scss">

	.new-message {

		&__buttons {
			display: flex;
			justify-content: space-evenly;
		}

		&__addButton {
			top: 50px;
		}

		&__add-message-button {
			display: flex;
			justify-content: center;
		}
	}

</style>