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
			@refresh="$emit('refresh')"
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
			comments: {
				type: Array,
				required: true
			},
			message_id: Number,
		}
	}
</script>

<style lang="scss">

</style>