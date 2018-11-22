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
																											<h3 class="headline mb-0">Kangaroo Valley Safari</h3>
																											<div>Located two hours south of Sydney in the Southern
																														Highlands of New South Wales, ...
																											</div>
																								</div>
																					</v-card-title>
																					<v-card-actions>
																								<v-btn flat color="orange">Share</v-btn>
																								<v-btn flat color="orange">Explore</v-btn>
																					</v-card-actions>
																		</v-card>
															</v-flex>
												</v-layout>
									</div>
						</div>
						<router-view></router-view>
			</div>
</template>

<script>
	export default {
		name: "BaseMain",
		components: {},
			data() {
			return {
				items: [{title: "1"}, {title: "2"}, {title: "3"}]
			};
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
									}
						}
			}
</style>