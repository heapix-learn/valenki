<template>

	<div class="comments-list-item">
		<span class="comments-list-item__nickname">{{comment.author_nick}}:</span>
		&nbsp;&nbsp;&nbsp;{{comment.phrase}}
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

		&__nickname {
			font-weight: 600;
			color: darkcyan;
		}

		&__nickname:hover {
			color: midnightblue;
		}
	}

</style>