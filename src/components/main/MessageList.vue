<template>
	<div class="message-list">

		<div v-for="(message, index) in Messages" :key="index">
			<MessageListItem :message="message"/>
		</div>

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
			Messages: Array
		}
	}
</script>

<style scoped>

</style>