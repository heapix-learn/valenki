<template>
	<div class="find-user">
		<v-form
			ref="form"
			class="find-user__form"
		>
			<v-text-field
				v-model="user_name"
				@keypress="search()"
				label="Enter user name here"
				type="text"
				required
				solo
				hide-details
			/>

		</v-form>

		<div v-if="users.length" class="find-user__results">

			<div class="find-user__results__title">
				Perhaps, these are the people you were looking for:
			</div>

			<div class="find-user__results__items">
				<div
					v-for="(user, index) in users"
					:key="index"
					class="find-user__results__items__one-item"
				>
					<router-link
						:to="{name: 'user-messages', params: {nick_name: user.nick_name, user_id: user.id}}">
						<div class="find-user__results__items__one-item__card">
							{{index+1}}.
							<div>
								<img
									:src="user.avatar"
									height="50"
									width="50"/>
							</div>
							{{user.nick_name}}
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import UserRepository from "../../classes/user/UserRepository";

	export default {
		name: "UserSearchForm",
		data() {
			return {
				user_name: '',
				users: {
					type: Array
				},
			}
		},
		methods: {
			async findUsers() {
				const userRepository = new UserRepository();
				this.users = await userRepository.findUsers(this.user_name);
			},
			search() {
				setTimeout(() => {
					this.findUsers()
				}, 1500);
			}
		}
	}
</script>

<style lang="scss">

	.find-user {
		background-color: #D3E3FC;

		&__form {
			display: flex;
			padding: 10px;
		}

		&__results {
			padding: 0 10px;

			&__title {
				padding-bottom: 10px;
			}

			&__items {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;

				&__one-item {
					width: 45%;
					margin: 5px;
					border: 2px solid white;

					&__card {
						height: 70px;
						display: flex;
						justify-content: space-around;
						align-items: center;
					}
				}

				&__one-item:hover {
					border: 2px solid #00887A;
				}
			}


		}
	}
</style>