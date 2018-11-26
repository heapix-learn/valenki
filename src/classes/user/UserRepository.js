import axios from 'axios'

export default class UserRepository {
	async getUsers() {
		const users = (await axios.get('http://localhost:3000/users')).data
		return users
	}

	async getUserNickname(id) {
		const nickname = (await axios.get('http://localhost:3000/users?id=' + id)).data[0].nick_name;
		return nickname
	}

	createUser(credential) {
		axios.post('http://localhost:3000/users', {credential})
	}

	async signIn(credential) {
		const token = (await axios.post('http://localhost:3000/auth/login', {credential})).data.access_token
		return token
	}

}
