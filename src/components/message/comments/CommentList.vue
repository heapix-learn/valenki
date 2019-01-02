<template>
	<div class="comment-list">
		<div v-for="(comment, index) in comments" :key="index">
			<CommentListItem
				:comment="comment"
				:author="getCommentAuthor(comment.userId)"
				:users="users"
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

	export default {
		name: "CommentList",
		data() {
			return {
				replyedComment: new Comment,
			}
		},
		props: {
			comments: {
				type: Array,
			},
			messageId: Number,
			users: Array
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
			},
			getCommentAuthor(id) {
				return this.users.filter(user => user.id === id)[0];
			},
			refresh() {
				this.replyedComment = new Comment
				this.$emit('refresh')
			}
		}
	}
</script>

<style lang="scss">

	.comment-list{
	padding: 5px 0px;
		box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
	}

</style>
