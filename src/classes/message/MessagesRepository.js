import axios from 'axios'

export default class MessagesRepository {

	async getAllMessages() {
		const messages = (await axios.get('http://localhost:3001/messages')).data
		return messages
	}

	getMessagesByUser(id) {
		return axios.get('http://localhost:3001/messages?author=' + id).then(response => response.data);
	}

}