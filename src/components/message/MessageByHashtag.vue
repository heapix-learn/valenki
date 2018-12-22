<template>
	<div class="hashtag-messages">
		<div v-if="!messages.length" class="hashtag-messages__non-exist">
			{{$t('$message.message_hashtag')}}
			"#{{this.$route.params.hashtag}}"
			{{$t('$general.non_exist')}} =(
			<br>
			<v-btn>
				<router-link :to="{name: 'find-hashtag'}" class="link">
					<span>{{$t('$general.find_else')}}</span>
				</router-link>
			</v-btn>
		</div>
		<div v-else>
			{{$t('$message.message_hashtag')}}
			#{{this.$route.params.hashtag}}:
			<MessageList :messages="messages"/>
		</div>
	</div>
</template>

<script>
	import MessageList from "./MessageList";
	import MessageRepository from "../../classes/message/MessageRepository"

	export default {
		name: "MessageByHashtag",
		data() {
			return {
				messages: []
			}
		},
		components: {MessageList},
		created() {
			this.getMessagesByHashtag(this.$route.params.hashtag)
		},
		methods: {
			async getMessagesByHashtag(hashtag) {
				const messageRepository = new MessageRepository();
				this.messages = await (messageRepository.getMessagesByHashtag(hashtag))
			},
		}
	}

</script>

<style lang="scss">

	.hashtag-messages {
		min-height: calc(100vh - 56px - 36px);
		background-color: cornflowerblue;

		&__non-exist {
			padding: 10px;
			text-align: center;
			font-size: 15pt;
		}
	}

</style>