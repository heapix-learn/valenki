<template>
	<div class="subscribe-offers">
		<v-layout justify-center>
			<v-flex xs12 sm6>
				<v-toolbar color="#d3e3fc" dark>
					<v-toolbar-side-icon></v-toolbar-side-icon>
					<v-toolbar-title>
						<router-link to="">You can subscribe:</router-link>
					</v-toolbar-title>
					<v-btn icon >
						<router-link :to="{name: 'find-user'}" class="link">
							<v-icon>search</v-icon>
						</router-link>
					</v-btn>
				</v-toolbar>

				<v-card>
					<v-container
						fluid
						grid-list-md
					>
						<v-layout row wrap>
							<v-flex
								v-for="card in cards"
								v-bind="{ [`xs${card.flex}`]: true }"
								:key="card.title"
							>
								<v-card>
									<v-img
										:src="card.src"
										height="150px"
									>
										<v-container
											fill-height
											fluid
											pa-2
										>
											<v-layout fill-height>
												<v-flex xs12 align-end flexbox>
													<span class="headline white--text" v-text="card.title"></span>
												</v-flex>
											</v-layout>
										</v-container>
									</v-img>
									<v-card-actions>
										<v-btn icon>
											<v-icon>favorite</v-icon>
										</v-btn>
										<!--<v-btn icon>-->
											<!--<v-icon>bookmark</v-icon>-->
										<!--</v-btn>-->
									</v-card-actions>
								</v-card>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	export default {
		name: "SubscribeOffers",
		data() {
			return {
			cards: [
				{ title: 'Katy Perry', src: 'https://i.music.я.ws/img/artists/full/katy-perry.png', flex: 6 },
				{ title: 'Barak Obama', src: 'https://historytime.ru/wp-content/uploads/2016/11/%D0%BE%D0%B1%D0%B0%D0%BC%D0%B0.jpg', flex: 6 }
			]
		}
	}
	}
</script>

<style lang="scss">

	.subscribe-offers {
		margin-top: 10px;
	}

	@media screen and (min-width: 768px) {
		.subscribe-offers {
			max-width: 80% !important;
			margin-left: 10% !important;
		}
	}

</style>