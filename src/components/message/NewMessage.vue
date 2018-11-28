<template>
	<div class="new-message">
		<v-textarea
			:counter="140"
			outline
			label="Write your message there:"
		></v-textarea>
		<div class="new-message__buttons">
			<v-btn flat icon outline color="blue">
				<i class="material-icons">
					add_photo_alternate
				</i>
			</v-btn>
			<v-btn flat icon outline color="green">
				<i class="material-icons">
					gif
				</i>
			</v-btn>
			<v-btn flat icon outline color="orange">
				<i class="material-icons">
					sentiment_satisfied_alt
				</i>
			</v-btn>
		</div>

		<div class="new-message__add-message-button">
			<v-btn
				fixed
				dark
				fab
				:no-resize="true"
				color="red"
			>
				<i class="material-icons">
					create
				</i>
			</v-btn>
		</div>

	</div>
</template>

<script>
	import AddButton from "../layout/AddButton";

	export default {
		name: "NewMessage",
		components: {AddButton}
	}
</script>

<style lang="scss">

	.new-message {

		&__buttons {
			display: flex;
			justify-content: space-evenly;
		}

		&__addButton {
			top: 50px;
		}
		&__add-message-button {
			position: fixed;
		}
	}

</style>