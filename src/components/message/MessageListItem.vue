<template>
	<div id="message">
		<v-layout class="message-item">
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<div class="message-item__info">
						<div class="message-item__info__avatar">
							<router-link
								:to="{name: 'user-messages', params: {nick_name: message.userNickname, user_id: message.userId}}">
								<div>
									<img :src="message.user.avatar" height="50"
											 width="50"/>
								</div>
							</router-link>
						</div>
						<div class="message-item__info__title">
							<div class="message-item__info__title__nickname">
								<router-link
									:to="{name: 'user-messages', params: {nick_name: message.userNickname, user_id: message.userId}}">
									{{message.user.nick_name}}
								</router-link>
							</div>
							<div class="message-item__content-group__date">
								posted: {{message.created}}
							</div>
						</div>
					</div>
					<div>

						<div
							class="message-item__content-group__delete"
							v-if="this.$route.path.includes('profile')">
							<i class="material-icons small" @click="deletePost(message.id)">
								add_circle
							</i>
						</div>

						<div class="message-item__content-group">
							<div class="message-item__content-group__text">
								{{message.body}}
							</div>
							<div v-if="message.image"
									 class="message-item__content-group__image">
								<img :src="message.image" height="70%"
										 width="70%">
							</div>
							<div class="message-item__content-group__hashtag-group">
								<img
									src="../../assets/tag.png"
									height="18"
									width="18"
									v-if="message.tags.length"
									class="message-item__content-group__hashtag-group__image"/>
								<div
									v-for="(hashtag, index) in message.tags" :key="index"
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
							@click="addToFeatured()"
							:flat="true"
							fab
							small
							:style="{ color: featured.added ? 'orange' : 'lightgrey' }"
						>
							<i class="material-icons">
								stars
							</i>
						</v-btn>
						<v-btn
							class="message-item__button-group__button"
							@click="openComments(message.id)"
							:flat="true"
							fab
							small
							color="#00887A"
						>
							{{comments.length}}
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
							:style="{ color: like.liked ? '#FFCCBC' : 'lightgrey' }"
						>
							{{like.quantity}}&nbsp;
							<i class="material-icons">
								thumb_up_alt
							</i>
						</v-btn>
					</div>
					<CommentList
						:comments="comments"
						:messageId="message.id"
						v-if="readComments"
						@refresh="getComments(message.id)"
					/>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import User from '../../classes/user/User'
	import Like from '../../classes/like/Like.js'
	import CommentList from './comments/CommentList.vue'
	import LikeRepository from '../../classes/like/LikeRepository'
	// import UserRepository from '../../classes/user/UserRepository'
	import MessageRepository from '../../classes/message/MessageRepository.js'
	import CommentRepository from '../../classes/comment/CommentRepository.js'
	import Message from '../../classes/message/Message'

	export default {
		name: 'MessageListItem',
		components: {
			CommentList,
		},
		data() {
			return {
				readComments: false,
				messages: {
					type: Array,
				},
				comments: {
					type: Array,
				},
				user: {
					type: User,
					required: true,
				},
				featured: {
					id: null,
					added: false,
				},
				like: {
					id: null,
					liked: false,
					quantity: this.message.likes.length,
				},
			}
		},
		props: {
			message: {
				type: Message,
				required: true,
			},
			index: Number,
		},
		created() {
			this.setLikeState()
			this.setFavouriteState()
			this.setCommentsState()
		},
		computed: {
			imgPath() {
				return require('../../assets/' + this.message.userId + '.png')
			},

		},
		methods: {
			setLikeState() {
				const userId = Number(localStorage.getItem('id'))
				const isLiked = this.message.likes.filter(item => item.userId === userId)
				if (isLiked.length !== 0) {
					this.like.id = isLiked[0].id
					this.like.liked = true
				}
			},
			setCommentsState() {
				this.comments = this.message.comments
			},
			setFavouriteState() {
				const userId = Number(localStorage.getItem('id'))
				const isFeatured = this.message.featured.filter(item => item.userId === userId)
				if (isFeatured.length !== 0) {
					this.featured.id = isFeatured[0].id
					this.featured.added = true
				}
			},
			isSavedMessage() {
				const userId = Number(localStorage.getItem('id'))
				const featured = this.message.featured.filter(item => item.userId === userId)
				return featured.length ? true : false
			},
			async openComments(id) {
				if (!this.readComments) {
					await this.getComments(id)
				}
				this.readComments = !this.readComments
			},
			async getComments() {
				const commentRepository = new CommentRepository()
				this.comments = await (commentRepository.getComments(this.message.id))
			},
			async likePost() {
				const like = new Like
				like.messageId = this.message.id
				like.userId = Number(localStorage.getItem('id'))
				const likeRepository = new LikeRepository()
				if (!this.like.liked) {
					const id = await likeRepository.likePost(like)
					this.like.id = id
					this.like.liked = true
					this.like.quantity++
				} else {
					await likeRepository.unlikePost(this.like.id)
					this.like.liked = false
					this.like.quantity--
				}
			},
			async getSaved() {
				const messageRepository = new MessageRepository()
				const userId = Number(localStorage.getItem('id'))
				this.featured = await messageRepository.getSaved(this.message.id)
				let Saved_id = this.featured_id
				this.featured.forEach((item) => {
					if (Number(item.userId) === Number(userId)) {
						Saved_id = item.id
						this.featured = true
					}
				})
				this.featured_id = Saved_id
			},
			async addToFeatured() {
				let message = {}
				message.userId = Number(localStorage.getItem('id'))
				message.messageId = this.message.id
				const messageRepository = new MessageRepository()
				if (!this.featured.added) {
					const id = await messageRepository.savePost(message)
					this.featured.id = id
					this.featured.added = true
				} else {
					await messageRepository.deleteSavedPost(this.featured.id)
					this.featured.added = false
				}
			},
			async deletePost() {
				const messageRepository = new MessageRepository()
				const resp = await messageRepository.deletePost(this.message.id)
				if (resp) {
					this.$emit('deleteMessage', this.message.id)
				}
			}
		}
	}

</script>

<style lang="scss">

	.message-item {
		padding-top: 15px;

		&__info {
			display: flex;
			align-items: center;
			height: 35px;
			background: aliceblue;

			&__avatar {
				margin-left: 10px;
			}

			&__title {
				width: 100%;
				margin-right: 10px;
				display: flex;
				justify-content: space-between;
				padding: 10px 5px 10px 10px;
				align-items: baseline;

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

			&__delete {
				transform: rotate(45deg);
				color: indianred;
				position: absolute;
				top: -13px;
				right: 4px;
				cursor: pointer;
			}

			&__text {
				text-align: left;
				padding-top: 5px;
			}

			&__image {
				display: flex;
				justify-content: center;
			}

			&__hashtag-group {
				display: flex;
				padding: 5px 10px 0 5px !important;

				&__image {
					margin-right: 10px;
					/*display: none;*/
				}

				&__hashtag {
					font-size: smaller;
					padding-right: 10px;

					a {
						color: #00887A !important;
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
