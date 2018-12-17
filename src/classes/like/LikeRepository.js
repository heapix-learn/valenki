import axios from 'axios';

export default class LikeRepository {

	async getLikes(id) {
		return (await axios.get('http://localhost:3000/likes?message_id=' + id, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data
	}

	async likePost(like) {
		await (axios.post('http://localhost:3000/likes', like,  {
			headers: {
				authorization: localStorage.getItem('token')
			}
		}))
	}

	async unlikePost(id) {
		await (axios.delete(`http://localhost:3000/likes/${id}`, {
			headers: {
				authorization: localStorage.getItem('token'),
			}
		}))
	}
}