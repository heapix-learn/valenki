<template>
	<div class="base-main">
		<div v-if="!messages.length" class="base-main__note">
			<v-progress-linear :indeterminate="true" color="blue"/>
			<span>{{$t('$general.no_login_alert')}}</span>
		</div>

		<div v-else class="base-main__content">

			<!--<div class="base-main__content__sort">-->
				<!--<div class="base-main__content__sort__title">-->
					<!--{{$t('$general.sort_by_date')}}:-->
				<!--</div>-->
				<!--<i-->
					<!--class="material-icons base-main__content__sort__sortIcon"-->
					<!--:class="{'reversed': direction === 'down'}"-->
					<!--@click="sortByDate()">-->
					<!--sort-->
				<!--</i>-->
			<!--</div>-->

			<MessageList
				:messages="messages"
				:page="page"
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
				messages: [],
				newMessages: [],
				page: 1,
				direction: 'up',
				loading: false
			};
		},
		created() {
			this.getMessages(this.page)
		},
		methods: {
			async getMessages(page) {
				if (localStorage.getItem('nick')) {
					const messageRepository = new MessageRepository();
					this.newMessages = await (messageRepository.getAllMessages(page));
					let messages = this.messages;
					this.newMessages.forEach((item) => {
						messages.push(item)
					});
					this.messages = messages;
				}
			},
			async goToNext() {
				if (this.page < 1) {
					this.loading = true
					this.page += 1;
					await this.getMessages(this.page)
					this.loading = false
				}
			},
			goToPrev() {
				if (this.page > 1) {
					this.page -= 1;
					this.getMessages(this.page)
				}
			},
			sortByDate() {
				if (this.direction === 'up') {
					this.messages.sort(function (a, b) {
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
					this.messages.sort(function (a, b) {
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

		&__content {

			&__sort {
				display: flex;
				justify-content: center;
				align-items: center;

				&__title {
					padding-top: 5px
				}

				&__sortIcon {
					transition: transform .5s;
				}
			}
		}

		&__note {
			text-align: center;
			line-height: 10vh;
		}
	}

	.reversed {
		transition: transform .5s;
		transform: rotate(180deg)
	}

	.v-card__actions {
		justify-content: flex-end;
	}
</style>