import Jwt from '@hapi/jwt';
import dotenv from 'dotenv';

dotenv.config();
const tokenKey = process.env.TOKEN_KEY;

export default (isAdmin) => {
	const token = Jwt.token.generate({
		aud: 'token',
		iss: 'urn:issuer:test',
		group: '3w_back_group',
		isAdmin,
	}, {
		key: tokenKey,
		algorithm: 'HS512',
	}, {
		ttlSec: 14400, // 4 hours
	});
	return token;
};
