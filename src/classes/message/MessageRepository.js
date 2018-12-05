import axios from 'axios'
import MessageMapper from "./MessageMapper";

export default class MessageRepository {

	async getAllMessages() {
		const messages = (await axios.get('http://localhost:3000/messages', {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data;
		return messages.map(MessageMapper.map);
	}

	getMessagesByUser(id) {
		return axios.get('http://localhost:3000/messages?author=' + id).then(response => response.data);
	}

	async getMessagesByHashtag(hashtag) {
		return (await axios.get('http://localhost:3000/messages?chip_like=' + hashtag, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data
	}

	createMessage(message) {
		return axios.post('http://localhost:3000/messages', message, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		}).data;
	}

	async likePost(id, count) {
		const counter = (await axios.put('http://localhost:3000/messages_like', {"id": id,"count": count})).data
		return counter
	}

	async repostPost() {
		await console.log('reposted');
	}
}