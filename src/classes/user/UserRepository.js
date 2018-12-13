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
		const user = (await axios.get('http://localhost:3000/users/' + id, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data;
		return UserMapper.map(user);
	}

	async findUsers(nick_name) {
		const user = (await axios.get('http://localhost:3000/users?nick_name_like=' + nick_name)).data;
		return user.map(UserMapper.map);
	}

	async createUser(user) {
		await axios.post('http://localhost:3000/auth/register', user)
	}

	async editUser(user) {
		return (await axios.put('http://localhost:3000/users/' + user.id, user)).status;
	}

	async checkLogin() {
		console.log((await axios.get('http://localhost:3000/messages?id=101', {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).statusText)
	}

}