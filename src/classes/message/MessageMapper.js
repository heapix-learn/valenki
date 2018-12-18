/* eslint-disable */
import Message from './Message';

export default class MessageMapper {
	static map({
							 id, author_id, author_nick, phrase, liked, disliked, reposted, chip, created, picture, url
						 }) {
		const message = new Message()
		message.id = id,
			message.author_id = author_id,
			message.author_nick = author_nick,
			message.phrase = phrase,
			message.liked = liked,
			message.disliked = disliked,
			message.reposted = reposted,
			message.chip = chip;
			message.created = created;
			message.picture = picture;
			message.url = url;
		return message
	}
}
