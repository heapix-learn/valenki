<template>
	<v-btn
		class="base-main_add-button"
		fixed
		dark
		fab
		bottom
		right
		:no-resize="true"
		color="green"
		@click="createNewMessage()"
	>
		<i class="material-icons">
			create
		</i>
	</v-btn>
</template>

<script>
	export default {
		name: "AddButton",
		methods: {
			createNewMessage() {
				if (this.$route.path != "/messages/new_message") {
					this.$router.push("/messages/new_message")
				} else {
					alert("Вообще-то Вы уже создаете сообщение!")
				}
			}
		}
	}
</script>

<style scoped>

</style>