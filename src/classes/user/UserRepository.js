import axios from "axios";

export default class UserRepository {

	async getUsers() {
		const users = (await axios.get('http://localhost:3000/users')).data;
		return users
	}

	async signIn(credential) {
		const postResponse = (await axios.post('http://localhost:3000/auth/login', credential))
		return postResponse
	}

	async getUserById(id) {
		const user = (await axios.get('http://localhost:3000/users?id=' + id, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data[0];
		return user
	}

	async getUserNickname(id) {
		const nickname = (await axios.get('http://localhost:3000/users?id=' + id)).data[0].nick_name;
		return nickname
	}

	createUser(user) {
		axios.post('http://localhost:3000/auth/register', user)
	}

	async checkLogin() {
		console.log((await axios.get('http://localhost:3000/messages?id=101', {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).statusText)
	}

}