export default class User {
	id = Number
	first_name = String
	last_name = String
	nick_name = String
	login = String
	password = String

	constructor (data) {
		Object.assign(this, data)
	}
}