<template>
	<div class="comments-list">
		<div>
			<div v-for="(comment, index) in comments" :key="index">
				<CommentsListItem
					:comment="comment"
					:index="index"
				/>
			</div>

			<div class="comments-list__add-comments">
				<div class="comments-list__avatar">
					<i class="material-icons">
						sentiment_satisfied_alt
					</i>
				</div>
				<v-text-field
					v-model="newComment"
					type="email"
					required
				/>
				<v-btn :flat="true" color="blue" @click="">
					<i class="material-icons">
						send
					</i>
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
	import CommentsListItem from './CommentsListItem'


	export default {
		name: "CommentsList",
		components: {
			CommentsListItem,
		},
		data() {
			return {
				newComment: ''
				// comments: [
				// 	"i am first comment",
				// 	"i am second comment",
				// 	"and i am the third!"
				// ]
			}
		},
		props: {
			comments: Array
		},
		methods: {

		}
	}
</script>

<style lang="scss">

	.comments-list {

		&__add-comments {
			display: flex;
			align-items: center;
		}

		&__avatar {
			padding: 0 20px;
		}
	}


</style>