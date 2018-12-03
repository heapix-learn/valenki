<template>
	<div class="comments-list">
		<div v-for="(comment, index) in comments" :key="index">
			<CommentListItem
				:comment="comment"
				:index="index"
			/>
		</div>
		<CreateComment
			:message_id="message_id"
			v-on:refresh="refresh()"
		/>
	</div>
</template>

<script>
	import CommentListItem from './CommentListItem'
	import CreateComment from './CreateComment'

	export default {
		name: "CommentsList",
		components: {
			CommentListItem,
			CreateComment
		},

		props: {
			comments: Array,
			message_id: Number,
		},
		methods: {
			refresh() {
				this.$emit('refresh')
			},
		}
	}
</script>

<style lang="scss">

</style>