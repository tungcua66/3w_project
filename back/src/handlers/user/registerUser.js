import Boom from '@hapi/boom';
import createToken from '../../helpers/createToken.js';
import User from '../../model/User.js';

export default async (request) => {
	try {
		if (request.payload.password !== request.payload.passwordConfirm) {
			return Boom.badRequest('password and passwordConfirm must be the same');
		}

		const user = await User.create({
			login: request.payload.login,
			email: request.payload.email,
			password: request.payload.password,
			isAdmin: request.payload.isAdmin,
		});
		const token = createToken(user.isAdmin);
		return `${user.login} created. ${token}`;
	} catch (error) {
		return Boom.badRequest(error.message);
	}
};
