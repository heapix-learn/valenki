import axios from 'axios'
import CommentMapper from "./CommentMapper";

axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

export default class CommentRepository {

	async getComments(id) {
		const comments = (await axios.get("http://localhost:3000/comments?message_id=" + id)).data;
		return comments.map(CommentMapper.map);
	}

	async addComment(comment) {
		return (await axios.post('http://localhost:3000/comments', comment)).data;
	}

	async addSubComment(id, comment) {
		console.log('id = ', id , 'comment = ', comment)
		return (await axios.post(`http://localhost:3000/comments/${id}/sub_comments/`, comment)).data;
	}

	async deleteComment(id) {
		await axios.delete(`http://localhost:3000/comments/${id}`)
	}

}