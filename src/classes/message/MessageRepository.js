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

	async likePost(id) {
		await console.log('liked', id);
		console.log(axios.put('http://localhost:3000/messages?id=' + id, {"id": id}).then(response => response.data));
	}

	async dislikePost() {
		await console.log('disliked');
	}

	async repostPost() {
		await console.log('reposted');
	}
}