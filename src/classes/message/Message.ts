import User from '../user/User'

export default class Message {
	id: number = 0;
	value: string = '';
	// author: User;
	liked: number = 0;
	reposted: number = 0;

	constructor (data: Partial<Message> = {}) {
		Object.assign(this, data)
	}
}