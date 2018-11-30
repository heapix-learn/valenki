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
						<v-btn :flat="true" color="red">
							<i class="material-icons">
								thumb_down_alt
							</i>
						</v-btn>
						<v-btn :flat="true" color="orange">
							<i class="material-icons">
								reply_all
							</i>
						</v-btn>
						<v-btn :flat="true" color="green">
							<i class="material-icons">
								thumb_up_alt
							</i>
						</v-btn>
						<v-btn :flat="true" color="blue" @click="openComments()">
							<i class="material-icons">
								chat
							</i>
						</v-btn>
					</v-card-actions>

					<CommentsList v-if="readComments"/>

				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import CommentsList from './CommentsList'
	import MessageRepository from '../../classes/message/MessageRepository.js'


	export default {
		name: "MessageListItem",
		components: {
			CommentsList,
		},
		data() {
			return {
				readComments: false,
				messages: []
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
			openComments() {
				if (this.readComments) {
					this.readComments = false
				} else {
					this.readComments = true
				}
			},
			async getMessagesByHashtag(hashtag) {
				const messageRepository = new MessageRepository()
				this.messages = await (messageRepository.getMessagesByHashtag(hashtag))
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