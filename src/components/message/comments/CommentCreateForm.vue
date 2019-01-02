<template>
	<div class="create-comments" >
		<div class="create-comments__avatar">
			<i class="material-icons">
				sentiment_satisfied_alt
			</i>
		</div>

		<div class="create-comments__delete-reply">
			<i
				v-show="replyedComment.userNickname"
				class="material-icons small white"
				@click="$emit('refresh')"
			>
				format_clear
			</i>
		</div>

		<div class="create-comments__text-input">
			<v-text-field
				type="text"
				required
				v-model="comment.body"
				:prefix="replyedComment.userNickname"
				hide-details
			/>
		</div>

		<div class="create-comments__send-button">
			<i class="material-icons" @click="addComment()">
				send
			</i>
		</div>
	</div>
</template>

<script>
	import Comment from '../../../classes/comment/Comment'
	import CommentRepository from '../../../classes/comment/CommentRepository.js'

	export default {
		name: "CommentCreateForm",
		components: {},
		data() {
			return {
				comment: new Comment,
				phrase: ''
			}
		},
		props: {
			messageId: Number,
			replyedComment: Object
		},
		methods: {
			async addComment() {

				this.comment.userId = Number(localStorage.getItem('id'));
				this.comment.userNickname = localStorage.getItem('nick');
				this.comment.messageId = this.messageId;

				const commentRepository = new CommentRepository();

				if (this.replyedComment.userNickname) {
					this.comment.commentId = this.replyedComment.id;
					this.comment.body = this.replyedComment.userNickname + ',' + this.comment.body;
					await commentRepository.addReply(this.comment);
				} else {
					await commentRepository.addComment(this.comment);
				}
				this.comment.body = '';
				this.$emit('refresh');
			}
		}
	}
</script>

<style lang="scss">

	.create-comments {
		box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.2);

		display: flex;
		align-items: center;
		justify-content: space-around;
		color: darkcyan;
.material-icons {
	padding-top: 10px;
}
		&__text-input {
			width: 55%;
			.v-text-field {
				padding: 0px !important;
			}
		}
	}

</style>
