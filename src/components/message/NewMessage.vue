<template>
	<div class="new-message">
		message {{message}}
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
	import Message from '../../classes/message/Message'

	export default {
		name: "NewMessage",
		data() {
			return {
				message: new Message,
			}
		},

		methods: {
			checkFields() {
				this.message.author_id = localStorage.getItem('id');
				this.message.author_nick = localStorage.getItem('nick');
				if (this.message.phrase.length && this.message.author_id) {
					this.createMessage()
				} else {
					console.log('Вы ничего не написали =(')
				}
			},
			createMessage() {
				const messageRepository = new MessageRepository();
				const postResponse = messageRepository.createMessage(this.message);
				console.log(postResponse)
			}
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
			margin-top: 20px;
		}
	}

</style>