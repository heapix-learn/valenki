import User from './User'

export default class Message {
	id = Number;
	value = String;
	author = User;
	liked = Number;
	reposted = Number;

	constructor (data) {
		Object.assign(this, data)
	}
}