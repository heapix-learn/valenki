import axios from 'axios'

export default class MessageRepository {

	async getAllMessages() {
		const messages = (await axios.get('http://localhost:3000/messages', {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data
		return messages
	}

	getMessagesByUser(id) {
		return axios.get('http://localhost:3000/messages?author=' + id).then(response => response.data);
	}

	createMessage(message) {
		return axios.post('http://localhost:3000/messages', message,  {
			headers: {
				authorization: localStorage.getItem('token')
			}
		}).data;
	}
}