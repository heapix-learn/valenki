<template>

	<div class="comment-list-item">
		<div class="comment-list-item__avatar">
			<div>
				<div>
					<img style="max-width: 30px;" :src="imgPath"/>
				</div>
			</div>
		</div>
		<div class="comment-list-item__body">
			<div
				class="comment-list-item__body__nickname"
				@click="replyUser(comment.author_nick)"
			>
				{{comment.author_nick}}
			</div>
			<div class="comment-list-item__body__text truncate">
				<div>{{comment.phrase}}</div>
			</div>
		</div>
		<div class="comment-list-item__delete">
			<i class="material-icons small" @click="deleteComment()">
				close
			</i>
		</div>
	</div>

</template>

<script>
	import Comment from "../../../classes/comment/Comment.js"
	import CommentRepository from '../../../classes/comment/CommentRepository'

	export default {
		name: "CommentListItem",
		props: {
			comment: {type: Comment},
			index: Number
		},
		computed: {
			imgPath() {
				return require('../../../assets/' + this.comment.author_id + '.png')
			}
		},
		methods: {
			replyUser() {
				this.$emit('reply', this.comment.author_nick)
			},
			async deleteComment() {
				const commentRepository = new CommentRepository();
				await commentRepository.deleteComment(this.comment.id);
				this.$emit('refresh');
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../scss/colors';

	.comment-list-item {
		display: flex;
		padding-right: 5px;

		&__delete:hover {
			color: crimson;
		}

		&__delete {
			color: lightgrey;
			position: absolute;
			right: 0px;
			padding-top: 9px;
			cursor: pointer;

			.material-icons {
				height: 10px;
			}
		}

		&__avatar {
			padding: 0 5px 0 10px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__body {
			width: 89%;
			border-bottom: 1px solid lightgrey;

			&__nickname {
				font-weight: 600;
				color: $green;
				border-left: 1px solid lightgrey;
				padding-left: 10px;
				cursor: pointer;
			}

			&__text {
				padding-left: 10px;
				border-left: 1px solid lightgrey;
			}

			&__nickname:hover {
				color: $blue;
			}
		}

	}

	.truncate {
		width: 99%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

</style>