/* eslint-disable */
import Message from './Message';

export default class MessageMapper {
	static map({
							 id, userId, userNickname, body, tags, likes, favourites, comments, created
						 }) {
		const message = new Message()
		message.id = id,
			message.userId = userId,
			message.userNickname = userNickname,
			message.body = body,
			message.likes = likes,
			message.favourites = favourites,
			message.comments = comments,
			message.tags = tags;
			message.created = created;
		return message
	}
}
