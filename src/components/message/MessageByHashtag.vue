<template>
	<div class="hashtag-messages">
		Messages by hashtag #{{this.$route.params.hashtag}}:
		<MessageList :Messages="Messages"/>
	</div>
</template>

<script>
	import MessageList from "./MessageList";
	import MessageRepository from "../../classes/message/MessageRepository"

	export default {
		name: "MessageByHashtag",
		data() {
			return {
				Messages: []
			}
		},
		components: {MessageList},
		created() {
			this.getMessagesByHashtag(this.$route.params.hashtag)
		},
		methods: {
			async getMessagesByHashtag(hashtag) {
				const messageRepository = new MessageRepository();
				this.Messages = await (messageRepository.getMessagesByHashtag(hashtag))
			},
		}
	}

</script>

<style lang="scss">

	.hashtag-messages {
		background-color: cornflowerblue;
	}

</style>