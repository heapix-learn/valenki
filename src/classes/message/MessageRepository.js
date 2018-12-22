import axios from 'axios';
import MessageMapper from "./MessageMapper";

export default class MessageRepository {

	async createMessage(message) {
		return (await axios.post('http://localhost:3000/messages', message)).data;
	}

	async getAllMessages(page) {
		const messages = (await axios.get('http://localhost:3000/messages?_embed=likes&_embed=comments&_embed=featured&_expand=user&?_page=' + page)).data;
		return messages.map(MessageMapper.map);
	}

	async getMessagesByUser(id) {
		const messages = (await axios.get(`http://localhost:3000/messages?userId=${id}&_embed=likes&_embed=comments&_embed=featured&_expand=user`)).data;
		return messages.map(MessageMapper.map);
	}

	async getMessagesByHashtag(hashtag) {
		const messages = (await axios.get(`http://localhost:3000/messages?tags_like=${hashtag}&_embed=likes&_embed=comments&_embed=featured&_expand=user`)).data;
		return messages.map(MessageMapper.map);
	}

	async getMessageById(id) {
		let message = (await axios.get(`http://localhost:3000/messages?id=${id}&_embed=likes&_embed=comments&_embed=featured&_expand=user`)).data[0]; //because JSON server returned array
		return MessageMapper.map(message);
	}

	async getSaved(id) {
		return (await axios.get('http://localhost:3000/favourites?messageId=' + id)).data;
	}

	async getSavedMessages(id) {
		return (await axios.get('http://localhost:3000/featured?userId=' + id)).data;
	}

	async savePost(message) {
		return (await (axios.post('http://localhost:3000/featured', message))).data.id
	}

	async deleteSavedPost(id) {
		await (axios.delete(`http://localhost:3000/featured/${id}`))
	}

	async deletePost(id) {
		return (await (axios.delete(`http://localhost:3000/messages/${id}`)))
	}

}
