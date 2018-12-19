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
			:messageId="messageId"
			@refresh="refresh()"
		/>
	</div>
</template>

<script>
	import CommentListItem from './CommentListItem'
	import CommentCreateForm from './CommentCreateForm'
	import Comment from '../../../classes/comment/Comment'
	import CommentMapper from '../../../classes/comment/CommentMapper'

	export default {
		name: "CommentList",
		data() {
			return {
				replyedComment: new Comment
			}
		},
		components: {
			CommentListItem,
			CommentCreateForm
		},
		methods: {
			reply(replyedComment) {
				for (let key in replyedComment) {
					this.replyedComment[key] = replyedComment[key]
				}
				this.replyedComment = CommentMapper.map(this.replyedComment);
				// console.log('replyedComment', this.replyedComment)
			},
			refresh() {
				this.replyedComment = new Comment
				this.$emit('refresh')
			}
		},
		props: {
			comments: {
				type: Array,
				required: true
			},
			messageId: Number,
		}
	}
</script>

<style lang="scss">

</style>
