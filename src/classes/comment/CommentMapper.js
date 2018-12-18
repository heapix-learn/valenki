/* eslint-disable */
import Comment from './Comment';

export default class CommentMapper {
	static map({
							 id, message_id, author_id, author_nick, phrase, sub_comments
						 }) {
		const comment = new Comment()
		comment.id = id;
		comment.message_id = message_id;
		comment.author_id = author_id;
		comment.author_nick = author_nick;
		comment.phrase = phrase;
		comment.sub_comments = sub_comments;
		return comment;
	}
}
