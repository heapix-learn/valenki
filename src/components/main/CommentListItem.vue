<template>

	<div class="comments-list-item">
		<div>
			<span
				class="comments-list-item__nickname"
				@click="replyUser(comment.author_nick)"
			>
				{{comment.author_nick}}
			</span>
		</div>
		&nbsp;&nbsp;&nbsp;<div>{{comment.phrase}}</div>
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
		methods: {
			replyUser(nick) {
				this.$emit('reply', this.comment.author_nick)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../scss/colors';

	.comments-list-item {
		display: flex;
		padding-left: 5%;
		line-height: 25px;
		border-bottom: 1px solid lightgrey;

		&__nickname {
			font-weight: 600;
			color: $green;
			border-left: 1px solid lightgrey;
			padding-left: 10px;
			cursor: pointer;
		}

		&__nickname:hover {
			color: midnightblue;
		}
	}

</style>