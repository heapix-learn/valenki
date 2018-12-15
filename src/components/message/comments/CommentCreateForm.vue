<template>
	<div class="create-comments__add-comments">
		<div class="create-comments__avatar">
			<i class="material-icons">
				sentiment_satisfied_alt
			</i>
		</div>
		<v-text-field
			type="email"
			required
			v-model="comment.phrase"
			:prefix="replyedUser"
		/>
		<v-btn :flat="true" color="blue" @click="addComment()">
			<i class="material-icons">
				send
			</i>
		</v-btn>
	</div>
</template>

<script>
	import Comment from '../../../classes/comment/Comment.js'
	import CommentRepository from '../../../classes/comment/CommentRepository.js'

	export default {
		name: "NewCommentForm",
		components: {},
		data() {
			return {
				comment: {type: Comment},
			}
		},
		props: {
			message_id: Number,
			replyedUser: String
		},
		methods: {
			async addComment() {
				this.comment.phrase = this.replyedUser + this.comment.phrase;
				this.comment.author_id = localStorage.getItem('id');
				this.comment.author_nick = localStorage.getItem('nick');
				this.comment.message_id = this.message_id;
				const commentRepository = new CommentRepository();
				await commentRepository.addComment(this.comment);
				this.comment.phrase = '';
				this.$emit('refresh');
			}
		}
	}
</script>

<style lang="scss">

	.create-comments {

		&__add-comments {
			display: flex;
			align-items: center;
		}

		&__avatar {
			padding: 0 20px;
		}
	}

</style>