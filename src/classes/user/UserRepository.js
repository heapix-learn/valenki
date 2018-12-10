import axios from "axios"
import UserMapper from "./UserMapper"

export default class UserRepository {

	async getUsers() {
		const users = (await axios.get('http://localhost:3000/users')).data;
		return users.map(UserMapper.map)
	}

	async signIn(credential) {
		const postResponse = (await axios.post('http://localhost:3000/auth/login', credential))
		return postResponse
	}

	async getUserById(id) {
		console.log(id)

		const user = (await axios.get('http://localhost:3000/users?id=' + id, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data;
		console.log(user)
		return user.map(UserMapper.map)
	}

	async findUser(nick_name) {
		const user = (await axios.get('http://localhost:3000/users?nick_name_like=' + nick_name)).data;
		return user.map(UserMapper.map)
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