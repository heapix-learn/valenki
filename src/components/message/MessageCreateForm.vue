<template>
	<div class="new-message">
		<div class="new-message__spacer"/>
		<v-textarea class="new-message__text-input"
								:counter="140"
								height="150"
								box
								autofocus
								no-resize
								background-color="#f5f5f5"
								validate-on-blur
								label="Write your message there:"
								v-model="message.body"
		/>

		<div class="new-message__image-upload">
			<input id="image_upload" type="file" @change="addPicture">
		</div>

		<div v-if="message.image" class="new-message__uploaded-image">
			<img
				:src="message.image"
				height="20%"
				width="20%"
				alt="message.image"
			/>
			<div>
				<i class="material-icons small" @click="message.image = ''">
					add_circle
				</i>
			</div>
		</div>
		<div class="new-message__buttons">
			<v-btn flat color="blue" @click="uploadImage()">
				<i class="material-icons">
					add_photo_alternate
				</i>
			</v-btn>
			<v-btn flat color="red" @click="addVideo()">
				<i class="material-icons">
					ondemand_video
				</i>
			</v-btn>
			<v-btn flat color="pink" @click="addUrl()">
				<i class="material-icons">
					link
				</i>
			</v-btn>

			<!--<v-btn flat color="orange">-->
			<!--<i class="material-icons">-->
			<!--sentiment_very_satisfied-->
			<!--</i>-->
			<!--</v-btn>-->
		</div>

		<v-text-field class="new-message__url-input"
									v-if="videoInput"
									v-model="message.video"
									label="Enter YouTube-URL here:"
									type="text"
									required
									solo
									hide-details
		/>

		<v-text-field class="new-message__url-input"
									v-if="urlInput"
									v-model="message.url"
									label="Enter URL here:"
									type="text"
									required
									solo
									hide-details
		/>

		<div class="new-message__add-message-button">
			<v-btn
				dark
				fab
				small
				:no-resize="true"
				color="green"
				@click="checkFields()"
			>
				<i class="material-icons">
					send
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
				date: {},
				urlInput: false,
				videoInput: false
			}
		},

		methods: {
			uploadImage() {
				document.getElementById('image_upload').click()
			},
			addVideo() {
				this.urlInput = false;
				this.videoInput = !this.videoInput;
			},
			addUrl() {
				this.videoInput = false;
				this.urlInput = !this.urlInput
			},
			async checkFields() {
				this.message.userId = Number(localStorage.getItem('id'));
				this.message.userNickname = localStorage.getItem('nick');
				this.message.tags = this.message.body.match(/(#[a-z0-9][a-z0-9\-_]*)/ig);
				if (this.message.tags) {
					this.message.tags.forEach((tag, index) => {
						this.message.tags[index] = tag.replace(/#/g, '')
					});
				} else {
					this.message.tags = [];
				}
				this.message.video = this.message.video.replace(/watch\?v=/g, '/embed/')
				this.message.created = this.getDate();
				if (this.message.body.length && this.message.userId) {
					await this.createMessage()
					this.goToMain()
				} else {
					console.log('Вы ничего не написали =(')
				}
			},
			goToMain() {
				setTimeout(() => {
					window.location.href = "/"
				}, 2000);
			},
			createMessage() {
				const messageRepository = new MessageRepository();
				messageRepository.createMessage(MessageMapper.map(this.message));
			},
			getDate() {
				let d = new Date();

				let dd = d.getDate();
				if (dd < 10) {
					dd = '0' + dd;
				}
				let mm = d.getMonth() + 1;
				if (mm < 10) {
					mm = '0' + mm;
				}

				let yy = d.getFullYear() % 100;
				if (yy < 10) {
					yy = '0' + yy;
				}

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
					this.message.image = this.image
				}
				reader.readAsDataURL(file)
			},
		}
	}
</script>

<style lang="scss">


	.new-message {
		margin: 0 1vh !important;

		&__text-input {
			margin-bottom: -10px !important;
		}

		&__uploaded-image {
			display: flex;
			justify-content: center;
			i{
				color: crimson;
				transform: rotate(45deg);
				color: indianred;
				cursor: pointer;
			}
		}

		&__buttons {
			display: flex;
			justify-content: space-evenly;
		}

		&__add-message-button {
			display: flex;
			justify-content: center;
		}

		&__image-upload {
			display: none;
			justify-content: center;
			padding: 10px;
		}

		&__spacer {
			height: 10px;
		}
	}

</style>
