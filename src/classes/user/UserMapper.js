/* eslint-disable */
import User from './User';

export default class UserMapper {
	static map({
							 id, email, password, nick_name, avatar, locale, subscriptions
						 }) {
		const user = new User()
		user.id = id;
		user.email = email;
		user.password = password;
		user.nick_name = nick_name;
		user.avatar = avatar;
		user.locale = locale;
		user.subscriptions = subscriptions;
		return user
	}
}
