<template>
	<div>
		<v-layout class="message-item">
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<div class="message-item__info">
						<div class="message-item__info__avatar">
							<router-link
								:to="{name: 'user-messages', params: {nick_name: message.author_nick, user_id: message.author_id}}">
								<div style="width: 50px;">
									<img :src="user.avatar"/>
								</div>
							</router-link>
						</div>
						<div class="message-item__info__title">
							<div class="message-item__info__title__nickname">
								<router-link
									:to="{name: 'user-messages', params: {nick_name: message.author_nick, user_id: message.author_id}}">
									{{user.nick_name}}
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
							<i class="material-icons small" @click="deletePost()">
								add_circle
							</i>
						</div>

						<div class="message-item__content-group">
							<div class="message-item__content-group__text">
								{{message.phrase}}
							</div>
							<div
								class="message-item__content-group__picture"
								v-if="message.picture">
								<img
									:src="message.picture"
									alt=""
									height="60%"
									width="60%">
							</div>
							<div class="message-item__content-group__url" v-if="message.url">
								<a :href="message.url">{{message.url}}</a>
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
							@click="saveThisPost()"
							:flat="true"
							fab
							small
							:style="{ color: saved ? 'orange' : 'lightgrey' }"
						>
							{{saved_messages.length}}&nbsp;
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
	import User from '../../classes/user/User';
	import Like from '../../classes/like/Like.js';
	import Message from '../../classes/message/Message';
	import CommentList from './comments/CommentList.vue';
	import LikeRepository from "../../classes/like/LikeRepository";
	import UserRepository from "../../classes/user/UserRepository";
	import MessageRepository from '../../classes/message/MessageRepository.js';
	import CommentRepository from '../../classes/comment/CommentRepository.js';
	// import { VLayout, VFlex, VCard, VBtn } from 'vuetify/lib'

	export default {
		name: "MessageListItem",
		components: {
			// VLayout,
			// VFlex,
			// VCard,
			// VBtn,
			CommentList,
		},
		data() {
			return {
				readComments: false,
				comments: [],
				user: {
					type: User,
					required: true
				},
				saved: false,
				saved_messages: [],
				saved_id: null,
				liked: false,
				likes: [],
				like_id: null,
			}
		},
		props: {
			message: {
				type: Message,
				required: true
			}
		},
		created() {
			this.getUser()
			this.getComments()
			this.getLikes()
			this.getSaved()
		},
		computed: {
			imgPath() {
				return require('../../assets/' + this.message.author_id + '.png')
			}
		},
		methods: {
			async openComments(id) {
				this.readComments = (this.readComments) ? false : true
				if (this.readComments) {
					await this.getComments(id);
				}
			},
			async getComments() {
				const commentRepository = new CommentRepository();
				this.comments = await (commentRepository.getComments(this.message.id));
			},
			async getLikes() {
				const likeRepository = new LikeRepository();
				const user_id = localStorage.getItem('id');
				this.likes = await likeRepository.getLikes(this.message.id);
				let Like_id = this.like_id;
				this.likes.forEach((item) => {
					if (Number(item.user_id) == Number(user_id)) {
						Like_id = item.id;
						this.liked = true;
					}
				});
				this.like_id = Like_id
			},
			async getUser() {
				const id = this.message.author_id;
				const userRepository = new UserRepository();
				this.user = await (userRepository.getUserById(id))
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
			async getSaved() {
				const messageRepository = new MessageRepository();
				const user_id = localStorage.getItem('id');
				this.saved_messages = await messageRepository.getSaved(this.message.id);
				let Saved_id = this.saved_id;
				this.saved_messages.forEach((item) => {
					if (Number(item.user_id) === Number(user_id)) {
						Saved_id = item.id;
						this.saved = true;
					}
				});
				this.saved_id = Saved_id
			},
			async saveThisPost() {
				let repost = {
					user_id: 0,
					message_id: 0
				};
				repost.id = this.saved_id;
				repost.user_id = localStorage.getItem('id');
				repost.message_id = this.message.id;
				const messageRepository = new MessageRepository();
				if (!this.saved) {
					await messageRepository.savePost(repost);
					await this.getSaved();
					this.saved = true;
				} else {
					await messageRepository.deleteSavedPost(repost.id);
					await this.getSaved();
					this.saved = false;
				}
			},
			deletePost() {

			}
		}
	}

</script>

<style lang="scss">

	.message-item {
		padding-top: 10px;
		padding-bottom: 5px;

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
			}

			&__text {
				text-align: left;
				padding-top: 5px;
			}

			&__picture {
				display: flex;
				justify-content: center;
			}

			&__url:hover {

				a {
					color: blue !important;
				}
			}

			&__url {
				white-space: nowrap;
				font-style: oblique;
				text-decoration: underline;
				padding-left: 5px;

				a {
					color: darkblue !important;
				}
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