<template>
	<div class="base-main">

		<div v-if="!Messages.length" class="base-main__note">
			<span>Авторизуйтесь на сайте, чтобы просматривать сообщения!</span>
		</div>

		<div class="base-main__page">

			<div v-for="(message, index) in Messages" :key="index">

				<br>
				<SinglePost :message="message"/>

			</div>

		</div>

		<router-view></router-view>
	</div>
</template>

<script>
	import SinglePost from './SinglePost'
	import MessageRepository from '../../classes/message/MessageRepository.js'

	export default {
		name: "BaseMain",
		components: {
			SinglePost,
		},
		data() {
			return {
				Users: [],
				Messages: [],
				MessagesByAuthor: []
			};
		},
		created() {
			this.getMessages()
		},
		methods: {
			async getMessages() {
				const messageRepository = new MessageRepository()
				this.Messages = await (messageRepository.getAllMessages())
			},
		}
	};
</script>

<style lang="scss">
	.base-main {
		background: linear-gradient(60deg, #F2C14E, #F78154);

		&__note {
			text-align: center;
			line-height: 60vh;
		}

		&__page {
			text-align: center;
			padding-top: 7px;

			&__cart {
				margin: 5px 5px 0 5px;

				&__nickname {
					text-align: left;
					font-weight: 600;
					height: 26px;
					padding: 20px;
				}

				&__avatar {
					float: left;
				}
			}
		}
	}

	.v-card__actions {
		justify-content: flex-end;
	}
</style>