<template>

	<div class="comments-list-item">
		{{index+1}}. {{comment}}
	</div>

</template>

<script>
	export default {
		name: "CommentsListItem",
		props: {
			comment: String,
			index: Number
		},
	}
</script>

<style lang="scss">

</style>