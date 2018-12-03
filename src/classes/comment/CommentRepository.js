import axios from 'axios'

export default class CommentRepository {

	async getComments(id) {
		const comments = (await axios.get("http://localhost:3000/comments?message_id=" + id, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data;
		return comments;
	}

	getCommentsByUser(id) {
		return axios.get('http://localhost:3000/comments?author=' + id).then(response => response.data);
	}

	createComment(comment) {
		return axios.post('http://localhost:3000/comments', comment, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		}).data;
	}
}