<template>
	<div class="create-comments__add-comments">
		<div class="create-comments__avatar">
			<i class="material-icons">
				sentiment_satisfied_alt
			</i>
		</div>
		<v-text-field
			v-model="newComment.phrase"
			type="email"
			required
		/>
		<v-btn :flat="true" color="blue" @click="addComment()">
			<i class="material-icons">
				send
			</i>
		</v-btn>
	</div>
</template>

<script>
	import CommentRepository from "../../classes/comment/CommentRepository.js"
	import Comment from "../../classes/comment/Comment.js"

	export default {
		name: "CreateComment",
		components: {},
		data() {
			return {
				newComment: {type: Comment}
			}
		},
		props: {
			message_id: Number
		},
		methods: {
			async addComment() {
				this.newComment.author_id = localStorage.getItem('id');
				this.newComment.author_nick = localStorage.getItem('nick');
				this.newComment.message_id = this.message_id;
				const commentRepository = new CommentRepository();
				await commentRepository.addComment(this.newComment);
				this.newComment.phrase = '';
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