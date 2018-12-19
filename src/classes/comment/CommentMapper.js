/* eslint-disable */
import Comment from './Comment';

export default class CommentMapper {
	static map({
							 id, messageId, userId, userNickname, body, replies
						 }) {
		const comment = new Comment()
		comment.id = id;
		comment.messageId = messageId;
		comment.userId = userId;
		comment.userNickname = userNickname;
		comment.body = body;
		comment.replies = replies;
		return comment;
	}
}
