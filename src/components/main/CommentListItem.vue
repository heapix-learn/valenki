<template>

	<div class="comments-list-item">
		<div class="comments-list-item__avatar">
			<div>
				<div>
					<img style="max-width: 30px;" :src="imgPath"/>
				</div>
			</div>
		</div>
		<div class="comments-list-item__body">
			<div
				class="comments-list-item__body__nickname"
				@click="replyUser(comment.author_nick)"
			>
				{{comment.author_nick}}
			</div>
			<div class="comments-list-item__body__text truncate">
				<div>{{comment.phrase}}</div>
			</div>
		</div>
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
		computed: {
			imgPath() {
				return require('../../assets/' + this.comment.author_id + '.png')
			}
		},
		methods: {
			replyUser() {
				this.$emit('reply', this.comment.author_nick)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../scss/colors';

	.comments-list-item {
		display: flex;
		padding-right: 5px;

		&__avatar {
			padding: 0 5px 0 10px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__body {
			width: 89%;
			border-bottom: 1px solid lightgrey;

			&__nickname {
				font-weight: 600;
				color: $green;
				border-left: 1px solid lightgrey;
				padding-left: 10px;
				cursor: pointer;
			}

			&__text {
				padding-left: 10px;
				border-left: 1px solid lightgrey;
			}

			&__nickname:hover {
				color: $blue;
			}
		}
	}

	.truncate {
		width: 99%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

</style>