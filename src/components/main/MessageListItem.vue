<template>
	<div>
		<v-layout class="base-main__page__cart">
			<v-flex xs12 sm6 offset-sm3>
				<v-card>

					<v-avatar :tile="false" :size="66"
										class="base-main__page__cart__avatar">
						<img :src="imgPath" height="130" width="130"/>
					</v-avatar>

					<div class="base-main__page__cart__nickname">
						<span
							@click="getMessagesByUser(message.author)">{{message.author_nick}}
						</span>
					</div>

					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0"></h3>
							<div>
								{{message.phrase}}

								<span v-for="(hashtag, index) in message.chip" :key="index"
											class="hashtag"
											@click="getMessagesByHashtag(hashtag)">
									#{{hashtag}}
								</span>

							</div>
						</div>
					</v-card-title>

					<v-card-actions>
						<v-btn :flat="true" color="red" @click="dislike(message.id)">
							{{message.disliked}}
							<i class="material-icons">
								thumb_down_alt
							</i>
						</v-btn>
						<v-btn :flat="true" color="orange" @click="repost(message.id)">
							{{message.reposted}}
							<i class="material-icons">
								reply_all
							</i>
						</v-btn>
						<v-btn :flat="true" color="green" @click="like(message.id)">
							{{message.liked}}
							<i class="material-icons">
								thumb_up_alt
							</i>
						</v-btn>
						<v-btn :flat="true" color="blue" @click="openComments(message.id)">
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
	import MessageRepository from '../../classes/message/MessageRepository.js'
	import CommentRepository from '../../classes/comment/CommentRepository.js'

	export default {
		name: "MessageListItem",
		components: {
			CommentList,
		},
		data() {
			return {
				readComments: false,
				messages: [],
				comments: []
			}
		},
		props: {
			message: Object
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
			async getMessagesByHashtag(hashtag) {
				const messageRepository = new MessageRepository();
				this.messages = await (messageRepository.getMessagesByHashtag(hashtag))
			},
			async getComments(id) {
				const commentRepository = new CommentRepository();
				this.comments = await (commentRepository.getComments(id))
			},
			async like() {
				const messageRepository = new MessageRepository();
				await (messageRepository.likePost(this.message.id))
			},
			async dislike() {
				const messageRepository = new MessageRepository();
				await (messageRepository.dislikePost(this.message.dislike + 1))
			},
			async repost() {
				const messageRepository = new MessageRepository();
				await (messageRepository.repostPost(this.message.repost))
			}
		}
	}

</script>

<style lang="scss">

	.base-main__page__cart__nickname {
		span {
			cursor: pointer;
		}

		span:hover {
			color: cornflowerblue;
			padding-left: 1px;
		}
	}

	.hashtag {
		color: dodgerblue;
	}

	.hashtag:hover {
		cursor: pointer;
		color: hotpink;
	}

</style>