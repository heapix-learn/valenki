import Message from '../message/Message.js'

export default class User {
	id: number = 0;
	first_name: string = '';
	last_name: string = '';
	nick_name: string = '';
	login: string = '';
	password: string = '';
	messages: Message[] = [];

	constructor (data: Partial<User> = {}) {
		Object.assign(this, data)
	}
}