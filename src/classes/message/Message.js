import User from '../user/User'

export default class Message {
	id = null;
	user = User;
	userNickname = "";
	body = "";
	likes = [];
	comments = [];
	favourite = false
	tags = [];
	created = {};
}
