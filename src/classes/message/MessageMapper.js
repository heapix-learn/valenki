/* eslint-disable */
import Message from './Message';

export default class MessageMapper {
	static map({
							 id, user, userId, userNickname, body, tags, likes, featured, comments, created
						 }) {
		const message = new Message()
		message.id = id,
		message.user = user,
			message.userId = userId,
			message.userNickname = userNickname,
			message.body = body,
			message.likes = likes,
			message.featured = featured,
			message.comments = comments,
			message.tags = tags;
			message.created = created;
			message.picture = picture;
			message.url = url;
		return message
	}
}
