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
							@click="getMessagesByUser(message.author)">{{message.author.nick_name}}
						</span>
					</div>

					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0"></h3>
							<div>
								{{message.phrase}}
							</div>
						</div>
					</v-card-title>

					<v-chip color="lime" :small="true"
									v-for="(chip, count) in message.chip"
									:key="count">
						<v-avatar class="teal">#</v-avatar>
						{{chip.tag}}
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
</template>

<script>
	export default {
		name: "SinglePost",
		props: {
			message: Object
		},
		computed: {
			imgPath() {
				return require('../../assets/' + this.message.author.id + '.png')
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

</style>