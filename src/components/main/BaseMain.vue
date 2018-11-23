<template>
	<div class="base-main">

		<div class="base-main__page" v-if="Users.length">

			<div v-for="(User, index) in Users" :key="index">

				<v-layout class="base-main__page__cart" v-if="Messages.length">
					<v-flex xs12 sm6 offset-sm3>
						<v-card>

							<v-avatar :tile="false" :size="66"
												class="base-main__page__cart__avatar">
								<img src="../../assets/1.png" height="130" width="130"/>
							</v-avatar>

							<div class="base-main__page__cart__nickname">
								<span
									@click="getMessagesByUser(User.id)"> {{User.nick_name}}: </span>
							</div>

							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0"></h3>
									<div>
										{{Messages[index].phrase}}
									</div>
								</div>
							</v-card-title>

							<v-chip color="lime" :small="true"
											v-for="(chips, count) in Messages[index].chip"
											:key="count">
								<v-avatar class="teal">#</v-avatar>
								{{chips.tag}}
							</v-chip>

							<v-card-actions>
								<v-btn :flat="true" color="red">
									Dislike
								</v-btn>
								<v-btn :flat="true" color="blue">
									Repost
								</v-btn>
								<v-btn :flat="true" color="green">
									Like
								</v-btn>
							</v-card-actions>

						</v-card>
					</v-flex>
				</v-layout>

			</div>

			<span v-if="MessagesByAuthor.length">{{MessagesByAuthor}}</span>

		</div>

		<router-view></router-view>
	</div>
</template>

<script>
	import axios from 'axios'
	// import MessageFactory	from "../../classes/message/MessageFactory.ts"

	export default {
		name: "BaseMain",
		components: {},
		data() {
			return {
				Users: [],
				Messages: [],
				MessagesByAuthor: []
			};
		},
		methods: {
			getMessagesByUser(id) {
				axios.get('http://localhost:3000/messages?author=' + id)
					.then(response => {
						this.MessagesByAuthor = (response.data);
					});
			}
		},
		created() {
			axios.get('http://localhost:3000/users')
				.then(response => {
					this.Users = (response.data);
				});
			axios.get('http://localhost:3000/messages')
				.then(response => {
					this.Messages = (response.data);
				});
			// let message = MessageFactory.getDefault();
		},
	};
</script>

<style lang="scss">
	.base-main {
		background: linear-gradient(60deg, #F2C14E, #F78154);

		&__page {
			text-align: center;
			padding-top: 7px;

			&__cart {
				margin: 5px 5px 0 5px;

				&__nickname {
					text-align: left;
					font-weight: 600;
					height: 26px;
					padding: 20px;
				}

				&__avatar {
					float: left;
				}
			}
		}
	}

	.v-card__actions {
		justify-content: flex-end;
	}
</style>