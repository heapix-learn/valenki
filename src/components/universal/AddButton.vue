<template>
	<!--for mobile testing	-->
	<!--<div-->
	<!--v-if="$route.name !== 'MessageCreateForm'"-->
	<!--class="add-button">-->
	<!--for PC version-->
	<div
		v-if="$route.name !== 'MessageCreateForm' && provideNick.name"
		class="add-button">
		<v-btn
			class="add-button__button"
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
	</div>
</template>

<script>
	export default {
		name: "AddButton",
		data() {
			return {
				error: false
			}
		},
		methods: {
			createNewMessage() {
				if (this.$route.path != "/messages/new_message") {
					this.$router.push("/messages/new_message")
				} else {
					this.error = true
				}
			}
		},
		inject: ['provideNick']
	}
</script>

<style lang="scss">

</style>