<template>

	<div class="comments-list-item">
		{{index+1}}. {{comment.author_nick}}: &nbsp;&nbsp;&nbsp;{{comment.phrase}}
	</div>

</template>

<script>
	export default {
		name: "CommentsListItem",
		props: {
			comment: Object,
			index: Number
		},
	}
</script>

<style lang="scss">

	.comments-list-item {
		display: flex;
		padding-left: 5%;+
	}

</style>