<template>
	<div>
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
					@click="replyUser(comment.userNickname)"
				>
					{{comment.userNickname}}
				</div>
				<div class="comment-list-item__body__text truncate">
					<div>{{comment.body}}</div>
				</div>
			</div>
			<div class="comment-list-item__delete">
				<i class="material-icons small" @click="deleteComment()">
					close
				</i>
			</div>
		</div>

		<div v-for="(comment, index) in comment.sub_comments" :key="index" class="comment-list-item__sub-comment">
					<div class="comment-list-item__sub-comment__nickname">
							{{comment.userNickname}}
					</div>

					<div class="comment-list-item__sub-comment__text truncate">
							{{comment.body}}
					</div>
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
				return require('../../../assets/' + this.comment.userId + '.png')
			}
		},
		methods: {
			replyUser() {
				this.$emit('reply', this.comment)
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

		&__sub-comment {
			padding-left: 60px;
		}

		&__body,
		&__sub-comment {
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
