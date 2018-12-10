/* eslint-disable */
import User from './User';

export default class UserMapper {
	static map({
							 id, email, password, nick_name
						 }) {
		const user = new User()
		user.id = id;
		user.email = email;
		user.password = password;
		user.nick_name = nick_name;
		return user
	}
}
