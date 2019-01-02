import axios from 'axios';

export default class LikeRepository {

	async getLikes(id) {
		return (await axios.get('http://localhost:3000/likes?messageId=' + id, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data
	}

	async likePost(like) {
    return (await axios.post('http://localhost:3000/likes', like,  {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})).data.id
  }

	async unlikePost(id) {
		await (axios.delete(`http://localhost:3000/likes/${id}`, {
			headers: {
				authorization: localStorage.getItem('token'),
			}
		}))
	}
}
