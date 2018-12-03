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

	async addComment(comment) {
		return  (await axios.post('http://localhost:3000/comments', comment, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data;
	}

	getCommentsByUser(id) {
		return axios.get('http://localhost:3000/comments?author=' + id).then(response => response.data);
	}

}