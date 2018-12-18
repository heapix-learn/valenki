<template>
	<div class="comments-list">
		<div v-for="(comment, index) in comments" :key="index">
			<CommentListItem
				:comment="comment"
				:index="index"
				@reply="reply"
				@refresh="refresh()"
			/>
		</div>
		<CommentCreateForm
			:replyedComment="replyedComment"
			:message_id="message_id"
			@refresh="refresh()"
		/>
	</div>
</template>

<script>
	import CommentListItem from './CommentListItem'
	import CommentCreateForm from './CommentCreateForm'

	export default {
		name: "CommentList",
		data() {
			return {
				replyedComment: {}
			}
		},
		components: {
			CommentListItem,
			CommentCreateForm
		},
		methods: {
			reply(replyedComment) {
				this.replyedComment = replyedComment
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