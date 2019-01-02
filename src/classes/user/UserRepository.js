import axios from "axios"
import UserMapper from "./UserMapper";

export default class UserRepository {

	async getUsers() {
		const users = (await axios.get('http://localhost:3000/users')).data;
		return users.map(UserMapper.map)
	}

	async signIn(credential) {
		try {
			return (await axios.post('http://localhost:3000/auth/login', credential))
		} catch (err) {
			return 'error'
		}
	}

	async getUserById(id) {
		const user = (await axios.get('http://localhost:3000/users/' + id)).data;
		return UserMapper.map(user);
	}

	async getSubscribedUsers() {
		const id = localStorage.getItem('id')
		return (await axios.get('http://localhost:3000/users/' + id)).data.subscriptions;
	}

	async findUsers(nick_name) {
		const user = (await axios.get('http://localhost:3000/users?nick_name_like=' + nick_name)).data;
		return user.map(UserMapper.map);
	}

	async createUser(user) {
		await axios.post('http://localhost:3000/auth/register', user);
	}

	async editUser(user) {
		return (await axios.put('http://localhost:3000/users/' + user.id, user)).status;
	}

	async subscribeUser(subscribed_id) {
		const id = localStorage.getItem('id')
		let user = await this.getUserById(id)
		if (user.subscriptions.indexOf(subscribed_id) === -1) {
			user.subscriptions.push(subscribed_id)
			return (await axios.put('http://localhost:3000/users/' + id, user)).statusText;
		} else {
			return false
		}
	}

	async checkLogin() {
		console.log((await axios.get('http://localhost:3000/messages?id=101')).statusText)
	}

}