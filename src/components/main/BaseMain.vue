<template>
	<div class="base-main">
		<div v-if="!Messages.length" class="base-main__note">

			<v-progress-linear :indeterminate="true" color="red"/>

			<span>Авторизуйтесь на сайте, чтобы просматривать сообщения!</span>

		</div>

		<div v-else class="base-main__page">

			<div v-for="(message, index) in Messages" :key="index">

				<SinglePost :message="message"/>

			</div>

		</div>

		<router-view/>
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
				dialog: true,
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
			line-height: 10vh;
		}

		&__page {
			text-align: center;
			padding: 5px 0 10px 0;

			&__cart {
				padding: 5px;

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