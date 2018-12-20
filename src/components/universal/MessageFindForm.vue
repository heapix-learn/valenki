<template>
	<div class="find-message">
		<v-form
			ref="form"
			class="find-message__form"
		>
			<v-text-field
				v-model="hashtag"
				label="Enter hashtag here:"
				type="text"
				required
			/>
		</v-form>
		<div v-if="hashtag" class="find-message__hashtag">
			<router-link
				:to="{name: 'hashtag-messages', params: {hashtag: hashtag}}">
				#{{hashtag}}
			</router-link>
		</div>
	</div>
</template>

<script>

	export default {
		name: "MessageFindForm",
		data() {
			return {
				hashtag: ''
			}
		}
	}
</script>

<style lang="scss">

	.find-message {
		background-color: #D3E3FC;

		&__form {
			display: flex;
			padding: 10px;
		}

		&__hashtag {
			cursor: pointer;
			text-align: center;
			font-size: 20pt;
		}

		&__hashtag:hover {
			background: aquamarine;
		}
	}

</style>