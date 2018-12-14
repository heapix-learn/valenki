<template>
	<div class="base-layout">
		<BaseHeader/>
		<div class="base-layout__main">
			<router-view>
				<slot/>
			</router-view>
		</div>
		<AddButton/>
		<BaseFooter/>
	</div>
</template>

<script>
	import BaseHeader from '../header/BaseHeader'
	import BaseFooter from '../footer/BaseFooter'
	import AddButton from './AddButton'

	export default {
		name: 'layout',
		data() {
			return {
				nick: this.getNick(),
				bar: 'baz'
			}
		},
		provide () {
			const provideNick = {}
			Object.defineProperty(provideNick, 'name', {
				enumerable: true,
				get: () => this.nick,
				set: () => this.getNick(),
			})
			return { provideNick }
		},
		components: {
			BaseHeader,
			AddButton,
			BaseFooter
		},
		created() {
			this.getNick()
		},

		methods: {
			getNick() {
				this.nick = localStorage.getItem('nick')
				this.id = localStorage.getItem('id')
				return this.nick
			}
		}
	}
</script>

<style lang="scss">

	.base-layout {
		background-color: #D3E3FC;

		&__header {
		}

		&__main {
			margin-top: 56px;
			min-height: calc(100vh - 56px - 36px);
		}

		&__footer {
		}
	}

</style>