<template>
	<div>
		<v-layout class="message-item">
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<div class="message-item__info">
						<div class="message-item__info__avatar">
							<router-link
								:to="{name: 'user-messages', params: {nick_name: message.author_nick, user_id: message.author_id}}">
								<div style="width: 40px;">
									<img style="max-width: 40px;" :src="imgPath"/>
								</div>
							</router-link>
						</div>

						<div class="message-item__info__title">
							<router-link
								class="message-item__info__title__nickname"
								:to="{name: 'user-messages', params: {nick_name: message.author_nick, user_id: message.author_id}}">
								{{message.author_nick}}
							</router-link>
							<div class="message-item__content-group__date">
								posted: {{message.created}}
							</div>
						</div>
					</div>

					<div>

						<div class="message-item__content-group">
							<div class="message-item__content-group__text">
								{{message.phrase}}
							</div>
							<div class="message-item__content-group__hashtag-group">
								<img
									src="../../assets/hashtag.png"
									height="18"
									width="18"
									v-if="message.chip.length"
									class="message-item__content-group__hashtag-group__image"/>
								<div
									v-for="(hashtag, index) in message.chip" :key="index"
									class="message-item__content-group__hashtag-group__hashtag"
								>
									<router-link
										:to="{name: 'hashtag-messages', params: {hashtag: hashtag}}">
										#{{hashtag}}
									</router-link>
								</div>
							</div>
						</div>
					</div>

					<div class="message-item__button-group">
						<v-btn
							class="message-item__button-group__button"
							@click="repost(message.id)"
							:flat="true"
							fab
							small
							color="orange"
						>
							{{message.reposted}}&nbsp;
							<i class="material-icons">
								reply_all
							</i>
						</v-btn>
						<v-btn
							class="message-item__button-group__button"
							@click="openComments(message.id)"
							:flat="true"
							fab
							small
							color="#00887A">
							<i class="material-icons">
								chat
							</i>
						</v-btn>
						<v-btn
							class="message-item__button-group__button"
							@click="likePost()"
							:flat="true"
							fab
							small
							:style="{ color: liked ? '#FFCCBC' : 'lightgrey' }"
						>
							{{likes.length}}&nbsp;
							<i class="material-icons">
								thumb_up_alt
							</i>
						</v-btn>
					</div>

					<CommentList
						:comments="comments"
						:message_id="message.id"
						v-if="readComments"
						@refresh="getComments(message.id)"
					/>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import CommentList from './CommentList'
	import Like from '../../classes/like/Like.js'
	import MessageRepository from '../../classes/message/MessageRepository.js'
	import CommentRepository from '../../classes/comment/CommentRepository.js'
	import LikeRepository from "../../classes/like/LikeRepository";

	export default {
		name: "MessageListItem",
		components: {
			CommentList,
		},
		data() {
			return {
				readComments: false,
				messages: [],
				comments: [],
				saved: false,
				liked: false,
				likes: [],
				like_id: null,
			}
		},
		props: {
			message: {
				type: Object,
				required: true
			}
		},
		created() {
			this.getLikes()
		},
		computed: {
			imgPath() {
				return require('../../assets/' + this.message.author_id + '.png')
			}
		},
		methods: {
			openComments(id) {
				if (this.readComments) {
					this.readComments = false
				} else {
					this.getComments(id);
					this.readComments = true
				}
			},
			async getComments(id) {
				const commentRepository = new CommentRepository();
				this.comments = await (commentRepository.getComments(id));
			},
			async getLikes() {
				const likeRepository = new LikeRepository();
				const idd = localStorage.getItem('id');
				this.likes = await likeRepository.getLikes(this.message.id);
				let Like_id = this.like_id;
				this.likes.forEach((item) => {
					if (Number(item.user_id) == Number(idd)) {
						Like_id = item.id;
						this.liked = true;
					}
				})
				this.like_id = Like_id
			},
			async likePost() {
				const like = new Like;
				like.message_id = this.message.id;
				like.user_id = localStorage.getItem('id');
				like.id = this.like_id;
				const likeRepository = new LikeRepository();
				if (!this.liked) {
					await likeRepository.likePost(like);
					await this.getLikes();
					this.liked = true;
				} else {
					await likeRepository.unlikePost(like.id);
					await this.getLikes();
					this.liked = false;
				}
			},
			async repost() {
				const messageRepository = new MessageRepository();
				await (messageRepository.repostPost(this.message.repost))
			},
		}
	}

</script>

<style lang="scss">

	.message-item {
		margin-bottom: 5px;

		&__info {
			background: aliceblue;;

			&__avatar {
				float: left;
				margin-left: 10px;
			}

			&__title {
				margin-bottom: 10px;
				margin-right: 10px;
				display: flex;
				justify-content: space-between;
				/*border-bottom: 1px solid #00887A;*/
				padding: 10px 5px 5px 10px;

				&__nickname:hover {
					cursor: pointer;
					color: cornflowerblue;
				}

				&__liked {
					font-weight: 600;
				}
			}
		}

		&__content-group {
			padding: 0 20px;
			flex-direction: column;

			&__text {
				text-align: left;
			}

			&__hashtag-group {
				display: flex;
				padding: 5px 10px 0 5px !important;

				&__image {
					margin-right: 10px;
				}

				&__hashtag {
					font-size: smaller;
					padding-right: 10px;

					a {
						color: #00887A !important;
						text-transform: lowercase;
					}
				}

				&__hashtag:hover {
					cursor: pointer;

					a {
						color: darkblue !important;
					}
				}
			}

			&__date {
				color: #616161;
				font-size: smaller;
				text-align: right;
			}
		}

		&__button-group {
			padding: 0 10px;
			display: flex;
			justify-content: space-between;

			&__button {
				margin: 0 !important;
			}
		}

		&__buttons {
			padding: 0 !important;
			display: flex;
			flex-direction: column;

			&__button {
			}
		}
	}

	.v-card__title .message-item__content-group {
		text-align: left;
		padding: 0;
	}

	.message-item__buttons__button {
		min-width: unset;
	}
</style>