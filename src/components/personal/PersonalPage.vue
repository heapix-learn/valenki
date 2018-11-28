<template>
	<div class="personal-page">

		<v-avatar :tile="false" :size="130"
							class="base-main__page__cart__avatar">
			<img src="../../assets/6.png"/>
		</v-avatar>
		<br>
		<div class="personal-page__nickname">
			<h1>{{User.nick_name}}</h1>
		</div>
		<br>
		<div class="personal-page__info">
			<span>First Name: {{User.first_name}}</span><br>
			<span>Last Name: {{User.last_name}}</span>
		</div>

	</div>
</template>

<script>
	import UserRepository from '../../classes/user/UserRepository.js'

	export default {
		name: "PersonalPage",
		components: {},
		data() {
			return {
				User: {},
			}
		},
		created() {
			this.getUser(1)
		},
		methods: {
			async getUser(id) {
				const userRepository = new UserRepository()
				this.User = await (userRepository.getUserById(id))
			}
		}
	}
</script>

<style lang="scss">

	.personal-page {
		background: url("../../assets/slanted_lines.png");

		&__avatar {
		}

		&__nickname {
			padding: 20px;
			margin-top: 5vh;
			border-top: 2px solid darkslategrey;
			border-bottom: 2px solid darkslategrey;
			text-align: center;
			background-color: lavender;
		}

		&__info {
			padding: 20px;
			text-align: center;
			background-color: turquoise;
			border-top: 2px solid darkslategrey;
			border-bottom: 2px solid darkslategrey;
		}
	}

</style>