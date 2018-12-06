<template>
	<div>
		<v-layout class="message-item">
			<v-flex xs12 sm6 offset-sm3>
				<v-card dark>

					<v-avatar :tile="false" :size="66"
										class="message-item__avatar">
						<img :src="imgPath" height="130" width="130"/>
					</v-avatar>

					<!--<div-->
					<!--class="message-item__nickname"-->
					<!--@click="getMessagesByUser(message.author)">-->
					<!--{{message.author_nick}}-->
					<!--</div>-->

					<router-link
						:to="{name: 'user-messages', params: {nick_name: message.author_nick}}"
						class="message-item__nickname">
						{{message.author_nick}}
					</router-link>
					<div class="message-item__created">
						{{message.created}}
					</div>

					<v-card-title class="message-item__text">
						<div>
							<h3 class="headline mb-0"></h3>
							<div>
								{{message.phrase}}

								<span v-for="(hashtag, index) in message.chip" :key="index"
											class="message-item__text__hashtag"
											@click="getMessagesByHashtag(hashtag)">
									#{{hashtag}}
								</span>

							</div>
						</div>
					</v-card-title>

					<v-card-actions class="message-item__buttons">

						<v-btn
							@click="repost(message.id)"
							:flat="true"
							color="orange">
							{{message.reposted}}&nbsp;
							<i class="material-icons">
								reply_all
							</i>
						</v-btn>
						<v-btn
							@click="dislike(message.id)"
							:flat="true"
							:style="{ color: disliked ? 'red' : 'grey' }">
							<i class="material-icons">
								thumb_down_alt
							</i>
						</v-btn>

						{{message.liked}}
						{{Likes}}
						{{likes.length}}

						<v-btn
							@click="likePost1()"
							:flat="true"
							:style="{ color: liked ? 'green' : 'grey' }">
							<i class="material-icons">
								thumb_up_alt
							</i>
						</v-btn>
						<v-btn
							@click="openComments(message.id)"
							:flat="true"
							color="blue">
							<i class="material-icons">
								chat
							</i>
						</v-btn>
					</v-card-actions>
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
				disliked: false,
				liked: false,
				likes: [],
			}
		},
		props: {
			message: {
				type: Object,
				required: true
			}
		},
		computed: {
			imgPath() {
				return require('../../assets/' + this.message.author_id + '.png')
			},
			// eslint-disable-next-line
			Likes() {
				this.getLikes()
			},
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
			async getMessagesByHashtag(hashtag) {
				const messageRepository = new MessageRepository();
				this.messages = await (messageRepository.getMessagesByHashtag(hashtag))
			},
			async getComments(id) {
				const commentRepository = new CommentRepository();
				this.comments = await (commentRepository.getComments(id));
			},
			async getLikes() {
				const likeRepository = new LikeRepository();
				const idd = localStorage.getItem('id');
				this.likes = await likeRepository.getLikes(this.message.id);

				// let res = ''
				// this.likes.forEach(function (element) {
				// 	if ((element.user_id) === idd) {
				// 		console.log('this res', res)
				// 		this.res = 'true';
				// 	}
				// 	console.log('res', res)
				// })
								
				for (let i = 0; i < this.likes.length; i++) {
					if (Number(this.likes[i].user_id) == Number(idd)) {
						this.liked = true;
						break
					}
				}
			},
			async likePost1() {
				if (!this.liked) {
					const like = new Like
					like.message_id = this.message.id
					like.user_id = localStorage.getItem('id')
					console.log('new Like', like)
					const likeRepository = new LikeRepository();
					await likeRepository.likePost(like);
				}
			},
			// let count = 1;
			// const messageRepository = new MessageRepository();
			// if (this.liked) {
			// 	count = -1;
			// 	this.message.liked = await (messageRepository.likePost(this.message.id, count));
			// 	this.liked = false
			// } else {
			// 	if (this.disliked) {
			// 		count = 2;
			// 	}
			// 	this.message.liked = await (messageRepository.likePost(this.message.id, count));
			// 	this.disliked = false;
			// 	this.liked = true
			// }

			async dislike() {
				let count = 1;
				const messageRepository = new MessageRepository();
				if (this.disliked) {
					this.message.liked = await (messageRepository.likePost(this.message.id, count));
					this.disliked = false
				} else {
					if (this.liked) {
						count = -2;
					} else {
						count = -1;
					}
					this.message.liked = await (messageRepository.likePost(this.message.id, count));
					this.liked = false;
					this.disliked = true
				}
			},
			async repost() {
				const messageRepository = new MessageRepository();
				await (messageRepository.repostPost(this.message.repost))
			},
			getMessagesByUser() {

			}
		}
	}

</script>

<style lang="scss">

	.message-item {
		padding: 5px 10px;

		&__avatar {
			float: left;
		}

		&__nickname,
		&__created {
			float: left;
			padding: 10px 5px 5px 10px;
		}

		&__created {
			color: darkcyan;
		}

		&__nickname:hover {
			cursor: pointer;
			color: cornflowerblue;
		}

		&__text {
			width: 80%;
			padding: 0 0 0 10px !important;
			text-align: left;

			&__hashtag {
				color: dodgerblue;
			}

			&__hashtag:hover {
				cursor: pointer;
				color: hotpink;
			}
		}

		&__buttons {
			padding: 0 !important;
		}

	}

</style>