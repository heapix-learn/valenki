<template>
	<div>
		<PersonalPage :id="id"/>

		<div class="user-messages">
			<div v-if="!MessagesByAuthor.length" class="base-main__note">
			<span>
				Пользователь ещё ен опубликовал сообщений!
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
	import MessageList from "../../components/main/MessageList";
	import MessageRepository from '../../classes/message/MessageRepository.js'
	import PersonalPage from "../personal/PersonalPage";


	export default {
		name: "UserMessages",
		components: {PersonalPage, MessageList},
		data() {
			return {
				MessagesByAuthor: [],
				id: 0
			}
		},
		created() {
			this.getMessagesByUser()
		},
		methods: {
			async getMessagesByUser() {
				this.id = this.$route.params.author_id
				console.log(this.id)
				const messageRepository = new MessageRepository();
				this.MessagesByAuthor = await (messageRepository.getMessagesByUser(this.id))
			},
		}
	}
</script>

<style lang="scss">

	.user-messages {
		background-color: slategray;
	}
</style>