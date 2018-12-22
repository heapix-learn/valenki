<template>
	<div>
		<div class="comment-list-item">
			<div class="comment-list-item__avatar">
				<div>
					<router-link
						:to="{name: 'user-messages', params: {nick_name: author.nick_name, user_id: comment.userId}}">
						<v-avatar :tile="false" :size="25">
							<img style="max-width: 25px;" class="round" :src="author.avatar"/>
						</v-avatar>
					</router-link>
				</div>
			</div>
			<div class="comment-list-item__body">
				<div
					class="comment-list-item__body__nickname"
					@click="replyComment(author.nick_name)"
				>
					{{author.nick_name}}
				</div>
				<div class="comment-list-item__body__text truncate">
					<div>{{comment.body}}</div>
				</div>
			</div>
			<div class="comment-list-item__delete" v-if="comment.userId === Number(myId)">
				<i class="material-icons small" @click="deleteComment()">
					close
				</i>
			</div>
		</div>

		<div
			v-for="(reply, index) in comment.replies"
			:key="index"
			class="comment-list-item__replies">
			<div class="comment-list-item__replies__avatar">
				<router-link
					:to="{name: 'user-messages', params: {nick_name: getReplyAuthor(reply.userId).nick_name, user_id: reply.userId}}">
					<v-avatar :tile="false" :size="25">
						<img
							style="max-width: 25px;"
							:src="getReplyAuthor(reply.userId).avatar"
							alt="avatar"/>
					</v-avatar>
				</router-link>
			</div>
			<div class="comment-list-item__replies__reply">
				<div class="comment-list-item__replies__reply__nickname" @click="replyComment(getReplyAuthor(reply.userId).nick_name)">
					{{getReplyAuthor(reply.userId).nick_name}}
				</div>
				<div class="comment-list-item__replies__reply__text">
					{{reply.body}}
				</div>
			</div>
			<div class="comment-list-item__replies__reply__delete" v-if="reply.userId === Number(myId)">
				<i class="material-icons small" @click="deleteReply(reply.id)">
					close
				</i>
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
			comment: {
				type: Comment
			},
			users: Array,
			index: Number,
			author: {},
		},
		computed: {
			myId() {
				return localStorage.getItem('id')
			}
		},
		methods: {
			replyComment(nick) {
				this.comment.userNickname = nick
				this.$emit('reply', this.comment)
			},
			getReplyAuthor(id) {
				return this.users.filter(user => user.id === id)[0];
			},
			async deleteComment() {
				const commentRepository = new CommentRepository();
				await commentRepository.deleteComment(this.comment.id);
				this.$emit('refresh');
			},
			async deleteReply(id) {
				const commentRepository = new CommentRepository();
				await commentRepository.deleteReply(id);
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
			padding-top: 10px;
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

		&__replies {
			display: flex;
			padding-left: 20px;

			&__avatar {
				padding: 0 5px 0 10px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			&__reply {

				&__delete {
					color: lightgrey;
					position: absolute;
					right: 0px;
					padding-top: 10px;
				}

				&__delete:hover {
					color: crimson;
				}
			}
		}

		&__body,
		&__replies__reply {
			width: 89%;
			border-bottom: 1px solid lightgrey;

			&__nickname {
				margin-bottom: -5px;
				padding-top: 5px;
				font-weight: 600;
				color: $green;
				padding-left: 10px;
				cursor: pointer;
			}

			&__text {
				padding-bottom: 5px;
				padding-left: 10px;
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
