import axios from 'axios';
import MessageMapper from "./MessageMapper";

axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

export default class MessageRepository {

	async createMessage(message) {
		console.log('message post', message)
		return (await axios.post('http://localhost:3000/messages', message)).data;
	}

	async getAllMessages(page) {
		const messages = (await axios.get('http://localhost:3000/messages?_page=' + page)).data;
		return messages.map(MessageMapper.map);
	}

	async getMessagesByUser(id) {
		const messages = (await axios.get('http://localhost:3000/messages?author_id=' + id)).data;
		return messages.map(MessageMapper.map);
	}

	async getMessagesByHashtag(hashtag) {
		return (await axios.get('http://localhost:3000/messages?chip_like=' + hashtag)).data;
	}

	async getMessageById(id) {
		let message = (await axios.get('http://localhost:3000/messages/' + id)).data;
		return MessageMapper.map(message);
	}

	async getSaved(id) {
		return (await axios.get('http://localhost:3000/saved_messages?message_id=' + id)).data;
	}

	async getSavedMessages(id) {
		return (await axios.get('http://localhost:3000/saved_messages?user_id=' + id)).data;
	}

	async savePost(repost) {
		await (axios.post('http://localhost:3000/saved_messages', repost))
	}

	async deleteSavedPost(id) {
		await (axios.delete(`http://localhost:3000/saved_messages/${id}`))
	}

}