<template>
	<div>
		<PersonalPage :id="id"/>
		<!--Messages by @{{userNickName}}:-->
		<div class="user-messages">
			<div v-if="!messagesByAuthor.length" class="base-main__note">
			<span>
				Пользователь ещё не опубликовал сообщений!
			</span>
				{{messagesByAuthor}}
			</div>
			<div v-else>
				<MessageList
					:messages="messagesByAuthor"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import MessageList from "./MessageList";
	import PersonalPage from "../user/UserProfileForm";
	import MessageRepository from '../../classes/message/MessageRepository.js'

	export default {
		name: "MessageByUser",
		components: {
			PersonalPage,
			MessageList
		},
		data() {
			return {
				messagesByAuthor: [],
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
				this.messagesByAuthor = await (messageRepository.getMessagesByUser(this.id))
			}
		}
	}
</script>

<style lang="scss">

	.user-messages {
		background-color: d3e3fc;
	}

</style>