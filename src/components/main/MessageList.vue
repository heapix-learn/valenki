<template>
	<div class="message-list">
		<div v-for="(message, index) in Messages" :key="index">
			<MessageListItem :message="message"/>
		</div>
		<div class="message-list__page_buttons">
			<i
				class="material-icons"
				:class="{'message-list__page_buttons__no-arrow': page === 1}"
				@click="prevPage()"
			>
				chevron_left
			</i>
			<span>&nbsp;{{page}}&nbsp; </span>
			<i class="material-icons" @click="nextPage()">
				chevron_right
			</i>
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
			Messages: Array,
			page: Number
		},
		methods: {
			nextPage() {
				this.$emit('next');
			},
			prevPage() {
				this.$emit('prev');
			},
		}
	}
</script>

<style lang="scss">

	.message-list {

		&__page_buttons {
			display: flex;
			justify-content: center;
			align-items: center;

			&__no-arrow {
				opacity: 0;
			}
		}

	}
</style>