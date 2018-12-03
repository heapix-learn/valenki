<template>

	<div class="comments-list-item">
		{{comment.author_nick}}
		- {{comment.phrase}}
	</div>

</template>

<script>
	import Comment from "../../classes/comment/Comment.js"

	export default {
		name: "CommentsListItem",
		props: {
			comment: {type: Comment},
			index: Number
		},
	}
</script>

<style lang="scss">

	.comments-list-item {
		display: flex;
		padding-left: 5%;
	}

</style>