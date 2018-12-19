<template>
	<div class="create-comments">
		<div class="create-comments__avatar">
			<i class="material-icons">
				sentiment_satisfied_alt
			</i>
		</div>

		<div class="create-comments__delete-reply">
		<i
			v-if="replyedComment.userNickname"
			class="material-icons small blue"
			@click="$emit('refresh')">
			format_clear
		</i>
		</div>

		<div class="create-comments__text-input">
		<v-text-field
			type="text"
			required
			v-model="comment.body"
			:prefix="replyedComment.userNickname"
		/>
		</div>

		<div class="create-comments__send-button">
		<i class="material-icons" color="blue" @click="addComment()">
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
				let replyed_comment = {}
				for (let key in this.replyedComment) {
					replyed_comment[key] = this.replyedComment[key]
				}
				this.comment.userId = Number(localStorage.getItem('id'));
				this.comment.userNickname = localStorage.getItem('nick');
				this.comment.messageId = this.messageId;
				const commentRepository = new CommentRepository();
				console.log('before-before', this.replyedComment)
				if (replyed_comment.userNickname) {
					this.comment.body = replyed_comment.userNickname + ', ' + this.comment.body;
					console.log('before', replyed_comment, 'body', this.comment.body)
					console.log('this.comm', this.comment.body)
					replyed_comment.sub_comments.push(this.comment)
					await commentRepository.addSubComment(replyed_comment.id, replyed_comment);
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
		display: flex;
		align-items: center;

		&__avatar {
		}
	}

</style>
