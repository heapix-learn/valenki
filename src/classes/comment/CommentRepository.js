import axios from 'axios'
import CommentMapper from "./CommentMapper";

export default class CommentRepository {

	async getComments(id) {
		const comments = (await axios.get("http://localhost:3000/comments?message_id=" + id, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data;
		return comments.map(CommentMapper.map);
	}

	async addComment(comment) {
		return  (await axios.post('http://localhost:3000/comments', comment, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data;
	}

	async getCommentsByUser(id) {
		return (await axios.get('http://localhost:3000/comments?author=' + id));
	}

}