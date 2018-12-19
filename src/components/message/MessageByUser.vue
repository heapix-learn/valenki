<template>
	<div>
		<PersonalPage :id="id"/>
		Messages by @{{userNickName}}:
		<div class="user-messages">
			<div v-if="!MessagesByAuthor.length" class="base-main__note">
			<span>
				Пользователь ещё не опубликовал сообщений!
			</span>
				{{MessagesByAuthor}}
			</div>

			<div v-else class="base-main__page">
				<MessageList :Messages="MessagesByAuthor"/>
			</div>

		</div>
	</div>
</template>

<script>
	import MessageList from "./MessageList";
	import MessageRepository from '../../classes/message/MessageRepository.js'
	import PersonalPage from "../user/UserProfileForm";


	export default {
		name: "MessageByUser",
		components: {PersonalPage, MessageList},
		data() {
			return {
				MessagesByAuthor: [],
				id: null
			}
		},
		created() {
			this.getMessagesByUser()
		},
		computed: {
			userNickName() {
				return this.$route.params.nick_name
			}
		},
		methods: {
			async getMessagesByUser() {
				this.id = this.$route.params.user_id
				const messageRepository = new MessageRepository();
				this.MessagesByAuthor = await (messageRepository.getMessagesByUser(this.id))
			}
		}
	}
</script>

<style lang="scss">

	.user-messages {
		background-color: slategray;
	}
</style>