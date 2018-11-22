<template>
	<div class="base-main">
		<div class="base-main__page">
			<div v-for="(item, index) in items" :key="index">
				<v-layout class="base-main__page__cart">
					<v-flex xs12 sm6 offset-sm3>
						<v-card>
							<img src="../../assets/1.png" height="130" width="130"/>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">
										тут{{Message.author}}</h3>
									<div>{{Message.value}}
									</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn flat color="orange">
									Share
								</v-btn>
								<v-btn flat color="orange">
									Explore
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</div>
		</div>
		{{User}}<br>{{Message}}
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "BaseMain",
		components: {},
		data() {
			return {
				items: [{title: "1"}, {title: "2"}, {title: "3"}],
				User: {
					id: 2020327,
					first_name: 'Steven Paul',
					last_name: 'Jobs',
					nick_name: 'Steve',
					login: 'test@tut.by',
					password: '666666',
				},
				Message: {
					id: 101,
					value: 'Название звучало забавно, энергично и не страшно. Слово «apple» (яблоко) смягчало серьёзное «компьютер».',
					author: '',
					liked: 0,
					reposted: 0,
				}
			};
		},
		mounted () {
			console.log(this.Message.author)
		}
	}
	;
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
			}
		}
	}
</style>