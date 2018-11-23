<template>
			<v-toolbar :dark="false" :fixed="true">

						<router-link :to="{name: 'BaseMain'}">
									<img class="logo" src="../../assets/logo.png" height="37" width="246"/>
						</router-link>
						<v-spacer></v-spacer>

						<v-menu offset-y>
									<v-toolbar-side-icon slot="activator">M</v-toolbar-side-icon>
									<v-list class="link">

												<v-list-tile >
															<router-link :to="{name: 'LoginForm'}" class="link"><span>Login</span></router-link>
												</v-list-tile>

												<v-list-tile>
															SecondLine
												</v-list-tile>

												<v-list-tile>
															ThirdLine
												</v-list-tile>
									</v-list>
						</v-menu>

			</v-toolbar>
</template>

<script>
	import {
		VToolbar,
		VToolbarSideIcon,
		VMenu,
		VList,
		VListTile,
//   VBtn,
		VSpacer
	} from "vuetify/lib";

	export default {
		name: "BaseHeader",
		components: {
			VToolbar,
			VToolbarSideIcon,
			VMenu,
			VList,
			VListTile,
			// VBtn,
			VSpacer
		},
		data() {
			return {
				items: [{title: "Sign In"}, {title: "Sign Up"}, {title: "Info"}]
			};
		}
	};
</script>

<style lang="scss">
			@import "../../scss/global.scss";

			.logo {
						margin-top: 1vh;
			}

.spacer {
	height: 6vh !important;
}
</style>