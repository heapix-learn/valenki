import axios from 'axios'

export default class UsersRepository {
	async getUsers(){
		const users = (await axios.get('http://localhost:3000/users')).data
		return users
	}

	async getUserNickname(id) {
		const nickname = (await axios.get('http://localhost:3001/users?id=' + id)).data[0].nick_name;
		return nickname
	}

}