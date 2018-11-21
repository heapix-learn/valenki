<template>
	<div class="base-header">
		<div class="base-header__logo">
			<img src="@/assets/logo.png" class="base-header__logo__image"/>
		</div>
		<div class="base-header__button">
			<router-link to="/login">Login</router-link>
			<v-btn class="base-header__button__sign" @click="openSignInPage()">signIn</v-btn>
		</div>
	</div> 
</template>

<script>
	export default {
		name: "BaseHeader"
	}
</script>

<style lang="scss">
@import '@/scss/global.scss';

.base-header {
	width: 100%;
	display: grid;
	grid-template-columns: 50% 50%;
	height: 9vh;
	background-color: cadetblue;
	
	&__logo {
		&__image {
			width: 80%;
			padding: 3vh;
		}
	}
	&__button {
		&__sign {
			float: right;
			margin: 3vh 3vh;
		}
	}
}

</style>