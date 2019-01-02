<template>
	<div>
	<v-layout class="message-item">
		<v-flex xs12 sm6 offset-sm3>
			<v-card>
				<div class="message-item__info">
					<div class="message-item__info__avatar">
						<router-link
							:to="{name: 'user-messages', params: {nick_name: message.user.nick_name, user_id: message.userId}}">
							<v-avatar :tile="false" :size="50">
							<img
									:src="message.user.avatar"
									height="50"
									width="50"
								/>
							</v-avatar>
						</router-link>
					</div>
					<div class="message-item__info__title">
						<div class="message-item__info__title__nickname">
							<router-link
								:to="{name: 'user-messages', params: {nick_name: message.user.nick_name, user_id: message.userId}}">
								{{message.user.nick_name}}
							</router-link>
						</div>
						<div class="message-item__info__title__date">
							<span>{{$t('$message.posted')}}: {{message.created}}</span>
						</div>
					</div>
				</div>

				<div class="message-item__content-group">
					<div class="message-item__content-group__text">
						<span>{{message.body}}</span>
					</div>
					<div
						class="message-item__content-group__image"
						v-if="message.image">
						<img
							:src="message.image"
							height="70%"
							width="70%"
							alt="message.image"
						/>
					</div>
					<!--video-player, commented for clean console-->
					<div
						v-if="message.video">
						video is here!
						<!--class="message-item__content-group__video">-->
						<!--<iframe width="375" height="240" :src="message.video"-->
						<!--allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"-->
						<!--allowfullscreen>-->
						<!--</iframe>-->
					</div>
					<div v-if="message.url">
						<a :href="message.url">attached URL</a>
					</div>

					<div class="message-item__content-group__tag-group">
						<img
							class="message-item__content-group__tag-group__image"
							v-if="message.tags.length"
							src="../../assets/tag.png"
							alt="tag-pic"
							height="18"
							width="18"
						/>
						<div
							class="message-item__content-group__tag-group__tag"
							v-for="(tag, index) in message.tags" :key="index"
						>
							<router-link
								:to="{name: 'hashtag-messages', params: {hashtag: tag}}">
								<span>#{{tag}}</span>
							</router-link>
						</div>
					</div>
				</div>

				<div class="message-item__button-group" :class="{'opened-comments': readComments }">
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
						<!--add computed method to count replied comments(change get request)-->
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

				<div
					class="message-item__content-group__delete"
					v-if="this.$route.path.includes('profile')">
					<i class="material-icons small" @click="deletePost(message.id)">
						add_circle
					</i>
				</div>

				<CommentList
					:comments="comments"
					:users="usersInComments"
					:messageId="message.id"
					v-if="readComments"
					@refresh="getComments(message.id)"
				/>
			</v-card>
		</v-flex>
	</v-layout>
	<SubscribeOffers v-if="index%5-2 == 0 && $route.name == 'base-main'"/>
	</div>
</template>

<script>
	import Like from '../../classes/like/Like'
	import User from '../../classes/user/User'
	import CommentList from './comments/CommentList'
	import Message from '../../classes/message/Message'
	import LikeRepository from '../../classes/like/LikeRepository'
	import CommentRepository from '../../classes/comment/CommentRepository'
	import MessageRepository from '../../classes/message/MessageRepository'
	import SubscribeOffers from '../universal/SubscribeOffers'

	export default {
		name: 'MessageListItem',
		components: {
			CommentList,
			SubscribeOffers
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
				usersInComments: [],
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
			this.setLikeState();
			this.setFavouriteState();
			this.setCommentsState()
		},
		methods: {
			setLikeState() {
				const userId = Number(localStorage.getItem('id'));
				const isLiked = this.message.likes.filter(item => item.userId === userId);
				if (isLiked.length !== 0) {
					this.like.id = isLiked[0].id;
					this.like.liked = true
				}
			},
			setCommentsState() {
				this.comments = this.message.comments
			},
			setFavouriteState() {
				const userId = Number(localStorage.getItem('id'));
				const isFeatured = this.message.featured.filter(item => item.userId === userId);
				if (isFeatured.length !== 0) {
					this.featured.id = isFeatured[0].id;
					this.featured.added = true
				}
			},
			async openComments(id) {
				if (!this.readComments) {
					await this.getComments(id)
				}
				this.readComments = !this.readComments
			},
			async getComments() {
				const commentRepository = new CommentRepository();
				this.comments = await (commentRepository.getComments(this.message.id));
				this.usersInComments = await (commentRepository.getReplyedUsersInfo())
			},
			async likePost() {
				const like = new Like;
				like.messageId = this.message.id;
				like.userId = Number(localStorage.getItem('id'));
				const likeRepository = new LikeRepository();
				if (!this.like.liked) {
					const id = await likeRepository.likePost(like);
					this.like.id = id;
					this.like.liked = true;
					this.like.quantity++
				} else {
					await likeRepository.unlikePost(this.like.id);
					this.like.liked = false;
					this.like.quantity--
				}
			},
			async addToFeatured() {
				let message = {};
				message.userId = Number(localStorage.getItem('id'));
				message.messageId = this.message.id;
				const messageRepository = new MessageRepository();
				if (!this.featured.added) {
					const id = await messageRepository.savePost(message);
					this.featured.id = id;
					this.featured.added = true
				} else {
					await messageRepository.deleteSavedPost(this.featured.id);
					this.featured.added = false
				}
			},
			async deletePost() {
				const messageRepository = new MessageRepository();
				const resp = await messageRepository.deletePost(this.message.id);
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

				&__date {
					color: #616161;
					font-size: smaller;
					text-align: right;
				}
			}
		}

		&__content-group {
			padding: 0 10px;
			flex-direction: column;
			display: flex;
			align-items: center;

			&__text {
				align-self: normal;
				padding-top: 15px;
			}

			&__image {
				display: flex;
				justify-content: center;
			}

			&__video {
				padding: 5px 0;
				display: flex;
				justify-content: center;
			}

			&__tag-group {
				display: flex;
				padding: 5px 10px 0 5px !important;
				align-self: normal;

				&__image {
					margin-right: 10px;
					/*display: none;*/
				}


				&__tag {
					font-size: smaller;
					padding-right: 10px;

					a {
						color: #00887A !important;
					}
				}

				&__tag:hover {
					cursor: pointer;

					a {
						color: darkblue !important;
					}
				}
			}

			&__delete {
				transform: rotate(45deg);
				color: indianred;
				position: absolute;
				top: -13px;
				right: 4px;
				cursor: pointer;
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
	.opened-comments{
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
	}

	@media screen and (min-width: 768px) {
		.message-item {
			justify-content: center;
			max-width: 80% !important;
		}
}
</style>
