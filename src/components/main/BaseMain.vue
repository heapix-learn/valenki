<template>
	<div class="base-main">
		<div v-if="!Messages.length" class="base-main__note">
			<v-progress-linear :indeterminate="true" color="blue"/>
			<span>Авторизуйтесь на сайте, чтобы просматривать сообщения!</span>
		</div>

		<div v-else class="base-main__page">
			<MessageList
				:Messages="Messages"
				:page="pageNumber"
				@next="goToNext()"
				@prev="goToPrev()"
			/>
		</div>

		<router-view/>
	</div>
</template>

<script>
	import MessageList from './MessageList'
	import MessageRepository from '../../classes/message/MessageRepository.js'

	export default {
		name: "BaseMain",
		components: {
			MessageList
		},
		data() {
			return {
				dialog: true,
				Users: [],
				Messages: [],
				newMessages: [],
				MessagesByAuthor: [],
				pageNumber: 1,
			};
		},
		created() {
			this.getMessages(this.pageNumber)
		},
		methods: {
			async getMessages(page) {
				if (localStorage.getItem('nick')) {
					const messageRepository = new MessageRepository();
					this.newMessages = await (messageRepository.getAllMessages(page));
					let messages = this.Messages;
					this.newMessages.forEach( (item) => {
						messages.push(item)
					});
					this.Messages = messages;
				}
			},
			goToNext() {
				this.pageNumber += 1;
				this.getMessages(this.pageNumber)
			},
			goToPrev() {
				if (this.pageNumber > 1) {
					this.pageNumber -= 1;
					this.getMessages(this.pageNumber)
				}
			},
		}
	}
</script>

<style lang="scss">
	.base-main {
		background: #D3E3FC;
		min-height: calc(100vh - 56px - 36px);

		&__note {
			text-align: center;
			line-height: 10vh;
		}

		&__page {
			text-align: center;
			padding: 5px 0 5px 0;

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