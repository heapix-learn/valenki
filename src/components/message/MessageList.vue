<template>
	<div class="message-list">
		<v-infinite-scroll
			@bottom="nextPage"
			:offset='20'
			style="max-height: 100vh; overflow-y: scroll;"
		>
			<div v-for="(message, index) in Messages" :key="index">
				<MessageListItem
					:message="message"
					:index="index"
					@deleteMessage="deleteMessage"
				/>
			</div>

		</v-infinite-scroll>
	</div>
</template>
<script>
	import MessageListItem from './MessageListItem'

	export default {
		name: "MessageList",
		components: {
			MessageListItem
		},
		props: {
			Messages: Array,
			page: Number
		},
		methods: {
			nextPage() {
				this.loading = true
				this.$emit('next');
			},
			deleteMessage(id) {
				this.$emit('deleteMessage', id)
			}
		}
	}
</script>

<style lang="scss">

	.message-list {
		min-height: 80vh;
	}
</style>