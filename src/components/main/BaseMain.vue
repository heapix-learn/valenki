<template>
	<div class="base-main">
		<div class="base-main__page">
			<div v-for="(item, index) in items" :key="index">
				<v-layout class="base-main__page__cart">
					<v-flex xs12 sm6 offset-sm3>
						<v-card>
							<div class="base-main__page__cart__nickname">
								<span>{{}}:</span>
							</div>
							<img src="../../assets/1.png" height="130" width="130"/>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0"></h3>
									<div>{{Message.value}}
									</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn color="green">
									Like
								</v-btn>
								<v-btn color="blue">
									Re:post
								</v-btn>
								<v-btn color="red">
									Dis:like
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</div>
		</div>
		{{}}<br>{{Message}}
		<router-view></router-view>
	</div>
</template>

<script>
	// import MessageFactory	from "../../classes/message/MessageFactory.ts"

	export default {
		name: "BaseMain",
		components: {},
		data() {
			return {
				items: [{title: "1"}, {title: "2"}, {title: "3"}],
				Users: [{
					id: 1,
					first_name: 'Alex',
					last_name: 'Born',
					nick_name: 'ABorn',
					login: 'alex@tut.by',
					password: '111111',
				}, {
					id: 2,
					first_name: 'Vova',
					last_name: 'Green',
					nick_name: 'VGreen',
					login: 'vova@tut.by',
					password: '222222',
				}],
				// Steve: {
				// 	id: 2020327,
				// 	first_name: 'Steven Paul',
				// 	last_name: 'Jobs',
				// 	nick_name: 'Steve',
				// 	login: 'test@tut.by',
				// 	password: '666666',
				// },
				Message: {
					id: 101,
					value: '"Название звучало забавно, энергично и не страшно. Слово «apple» (яблоко) смягчало серьёзное «компьютер»."',
					liked: 0,
					reposted: 0,
				}
			};
		},
		created() {
			// let message = MessageFactory.getDefault();
			// console.log('this.Message', message)
		},
		methods() {
		}
	};
</script>

<style lang="scss">
	.base-main {
		padding-top: 1vh;
		background: linear-gradient(60deg, #F2C14E, #F78154);

		&__page {
			text-align: center;
			min-height: 100vh;
			height: 200vh;
			padding-top: 7vh;

			&__cart {
				margin: 7px 5px;

				&__nickname {
					text-align: left;
					padding: 10px;
					font-weight: 600;
				}
			}
		}
	}
</style>