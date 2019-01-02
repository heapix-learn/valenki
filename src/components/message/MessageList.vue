<template>
	<div class="message-list">
		<v-infinite-scroll
			class="message-list__infinite-scroll"
			@bottom="nextPage"
			:offset='20'
		>
			<div v-for="(message, index) in messages" :key="index" class="message-list__item">
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
			messages: Array,
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

		&__infinite-scroll {
			max-height: 80%;
			overflow-y: hidden;
		}
	}
</style>