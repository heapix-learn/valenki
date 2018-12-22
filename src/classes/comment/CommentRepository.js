import axios from 'axios';
import CommentMapper from "./CommentMapper";
import UserMapper from "../user/UserMapper";

export default class CommentRepository {

	async getComments(id) {
		const comments = (await axios.get(`http://localhost:3000/comments?messageId=${id}&_embed=replies`)).data;
		return comments.map(CommentMapper.map);
	}

	async getReplyedUsersInfo() {
		const indexes = [1, 2]
		let users =	(await axios.post('http://localhost:3000/comments/replies', indexes)).data
		return users.map(UserMapper.map)
	}

	async addComment(comment) {
		return (await axios.post('http://localhost:3000/comments', comment)).data;
	}

	async addReply(comment) {
		return (await axios.post('http://localhost:3000/replies', comment)).data;
	}

	async deleteComment(id) {
		await axios.delete(`http://localhost:3000/comments/${id}`)
	}

	async deleteReply(id) {
		await axios.delete(`http://localhost:3000/replies/${id}`)
	}

}
