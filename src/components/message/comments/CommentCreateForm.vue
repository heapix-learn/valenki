<template>
	<div class="create-comments__add-comments">
		<div class="create-comments__avatar">
			<i class="material-icons">
				sentiment_satisfied_alt
			</i>
		</div>
		<v-text-field
			type="text"
			required
			v-model="phrase"
			:prefix="replyedComment.author_nick"
		/>
		<v-btn :flat="true" color="blue" @click="addComment()">
			<i class="material-icons">
				send
			</i>
		</v-btn>
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
			message_id: Number,
			replyedComment: {
				type: Comment //i send "type: Comment" from "Comment-list", but receiving "type: Object"
			}
		},
		methods: {
			async addComment() {

				let replyed_comment = {}
				for (let key in this.replyedComment) {
					replyed_comment[key] = this.replyedComment[key]
				}
				this.comment.phrase = this.phrase
				this.comment.author_id = localStorage.getItem('id');
				this.comment.author_nick = localStorage.getItem('nick');
				this.comment.message_id = this.message_id;
				const commentRepository = new CommentRepository();
				if (this.replyedComment.author_nick) {
					this.comment.phrase = this.replyedComment.author_nick + ', ' + this.comment.phrase;
					this.comment.id = this.replyedComment.id + '.' + this.replyedComment.sub_comments.length
					replyed_comment.sub_comments.push(this.comment)
					await commentRepository.addSubComment(replyed_comment.id, replyed_comment);
				} else {
					await commentRepository.addComment(this.comment);
				}
				await this.$emit('refresh');
				this.phrase = '';
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