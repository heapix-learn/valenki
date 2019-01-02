import User from '../user/User'

export default class Message {
	id = null;
	user = User;
	userNickname = "";
	body = "";
	likes = [];
	comments = [];
	featured = false
	tags = [];
	created = {};
	image = '';
	url = '';
	video = '';
}