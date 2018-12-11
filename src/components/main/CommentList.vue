<template>
	<div class="comments-list">
		<div v-for="(comment, index) in comments" :key="index">
			<CommentListItem
				:comment="comment"
				:index="index"
				@reply="reply"
			/>
		</div>
		<CreateComment
			:replyedUser="replyedUser"
			:message_id="message_id"
			@refresh="refresh()"
		/>
	</div>
</template>

<script>
	import CommentListItem from './CommentListItem'
	import CreateComment from './CreateComment'

	export default {
		name: "CommentsList",
		data() {
			return {
				replyedUser: ''
			}
		},
		components: {
			CommentListItem,
			CreateComment
		},
		methods: {
			reply(nick) {
				this.replyedUser = nick + ', '
			},
			refresh () {
				this.replyedUser = ''
				this.$emit('refresh')
			}
		},
		props: {
			comments: {
				type: Array,
				required: true
			},
			message_id: Number,
		}
	}
</script>

<style lang="scss">

</style>