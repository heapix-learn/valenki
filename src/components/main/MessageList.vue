<template>
	<div class="message-list">
		<v-infinite-scroll
			@bottom="nextPage"
			:offset='20'
			style="max-height: 91vh; overflow-y: scroll;"
		>
			<div v-for="(message, index) in Messages" :key="index">
				<MessageListItem :message="message"/>
			</div>
			<v-progress-circular
				:indeterminate="true"
				v-if="loading"
				color="blue"
				:size="25" :width="3"
			/>
		</v-infinite-scroll>
	</div>
</template>
<script>
	import MessageListItem from './MessageListItem'


	export default {
		name: "MessageList",
		data() {
			return {
				loading: false
			}
		},
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
			}
		}
	}
</script>

<style lang="scss">

	.message-list {

	}
</style>