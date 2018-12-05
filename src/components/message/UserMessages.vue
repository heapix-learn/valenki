<template>
	<div class="user-messages">
		<div v-if="!MessagesByAuthor.length" class="base-main__note">
			<span>Пользователь ещё ен опубликовал сообщений!
			Пользователь ещё ен опубликовал сообщений!
			Пользователь ещё ен опубликовал сообщений!
			Пользователь ещё ен опубликовал сообщений!
			Пользователь ещё ен опубликовал сообщений!
			Пользователь ещё ен опубликовал сообщений!
			Пользователь ещё ен опубликовал сообщений!</span>
			{{MessagesByAuthor}}
		</div>
		<div v-else class="base-main__page">
			<MessageList :Messages="MessagesByAuthor"/>
		</div>

	</div>
</template>

<script>
	import MessageList from "../../components/main/MessageList";
	import MessageRepository from '../../classes/message/MessageRepository.js'


	export default {
		name: "UserMessages",
		components: {MessageList},
		data() {
			return {
				MessagesByAuthor: []
			};
		},
		created() {
			this.getMessagesByUser()
		},
		methods: {
			async getMessagesByUser() {
				const messageRepository = new MessageRepository();
				this.MessagesByAuthor = await (messageRepository.getMessagesByUser(1))
			},
		}
	}
</script>

<style lang="scss">

	.user-messages {
		background-color: red;
	}
</style>