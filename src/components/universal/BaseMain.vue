<template>
	<div class="base-main">
		<div v-if="!Messages.length" class="base-main__note">
			<v-progress-linear :indeterminate="true" color="blue"/>
			<span>{{ $t('$general.no_login_alert') }}</span>
		</div>

		<div v-else class="base-main">
			<div class="base-main__list">
				<div style="padding-top: 5px">{{ $t('$general.sort_by_date') }}:</div>
				<i
					class="material-icons base-main__list__sortButton"
					:class="{'base-main__list__sortButton__reversed': direction === 'down'}"
					@click="sortByDate()">
					sort
				</i>
			</div>
			<MessageList
				:Messages="Messages"
				:page="pageNumber"
				@next="goToNext()"
				@prev="goToPrev()"
			/>
			<v-progress-circular
				:indeterminate="true"
				v-if="loading"
				color="blue"
				:size="25" :width="3"
			/>
		</div>
		<router-view/>
	</div>
</template>

<script>
	import MessageList from '../message/MessageList'
	import MessageRepository from '../../classes/message/MessageRepository.js'

	export default {
		name: "BaseMain",
		components: {
			MessageList
		},
		data() {
			return {
				dialog: true,
				Users: [],
				Messages: [],
				newMessages: [],
				MessagesByAuthor: [],
				pageNumber: 1,
				direction: 'up',
				loading: false
			};
		},
		created() {
			this.getMessages(this.pageNumber)
		},
		methods: {
			async getMessages(page) {
				if (localStorage.getItem('nick')) {
					const messageRepository = new MessageRepository();
					this.newMessages = await (messageRepository.getAllMessages(page));
					let messages = this.Messages;
					this.newMessages.forEach((item) => {
						messages.push(item)
					});
					this.Messages = messages;
					console.log(this.Messages)
				}
			},
			async goToNext() {
				if (this.pageNumber < 1) {
					this.loading = true
					this.pageNumber += 1;
					await this.getMessages(this.pageNumber)
					this.loading = false
				}
			},
			goToPrev() {
				if (this.pageNumber > 1) {
					this.pageNumber -= 1;
					this.getMessages(this.pageNumber)
				}
			},
			sortByDate() {
				if (this.direction === 'up') {
					this.Messages.sort(function (a, b) {
						if (a.created > b.created) {
							return 1;
						}
						if (a.created < b.created) {
							return -1;
						}
						return 0;
					})
					this.direction = 'down'

				} else {
					this.Messages.sort(function (a, b) {
						if (a.created < b.created) {
							return 1;
						}
						if (a.created > b.created) {
							return -1;
						}
						return 0;
					})
					this.direction = 'up'
				}
			},
		}
	}
</script>

<style lang="scss">
	.base-main {
		background: #D3E3FC;
		min-height: calc(100vh - 56px - 36px);

		&__list {
			display: flex;
			justify-content: center;
			align-items: center;

			&__sortButton {
				transition: transform 1s;

				&__reversed {
					transition: transform 1s;
					transform: rotate(180deg)
				}
			}
		}

		&__note {
			text-align: center;
			line-height: 10vh;
		}
	}

	.v-card__actions {
		justify-content: flex-end;
	}
</style>