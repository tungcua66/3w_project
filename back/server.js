import Hapi from '@hapi/hapi';
import Mongoose from 'mongoose';
import Jwt from '@hapi/jwt';

import registerUser from './src/handlers/user/registerUser.js';
import loginUser from './src/handlers/user/loginUser.js';

import getShop from './src/handlers/shop/getShop.js';
import getProductByID from './src/handlers/shop/getProductByID.js';
import createProduct from './src/handlers/shop/createProduct.js';
import modifyProduct from './src/handlers/shop/modifyProduct.js';
import getProduct from './src/handlers/shop/getProduct.js';
import deleteProduct from './src/handlers/shop/deleteProduct.js';

import getCategory from './src/handlers/shop/getCategory.js';
import createCategory from './src/handlers/shop/createCategory.js';
import modifyCategory from './src/handlers/shop/modifyCategory.js';
import deleteCategory from './src/handlers/shop/deleteCategory.js';

import uploadImage from './src/helpers/uploadImage.js';
import createImage from './src/handlers/image/createImage.js';

const hostPort = process.env.HOST_PORT;
const host = process.env.HOST;
const dbUrl = process.env.DB_URL;

const connectDb = async () => {
	try {
		await Mongoose.connect(dbUrl);
		console.log('Connected to 3w-back database!');
	} catch (error) {
		console.log('Connection failed');
		console.error(error.message);
	}
};

const init = async () => {
	const server = new Hapi.Server({ host,
		port: hostPort,
		routes: {
			cors: true,
		} });
	await server.register(Jwt);
	server.auth.strategy('user_jwt_strategy', 'jwt', {
		keys: 'secret',
		verify: {
			aud: 'token',
			iss: 'urn:issuer:test',
			sub: false,
			nbf: true,
			exp: true,
			maxAgeSec: 14400, // 4 hours
			timeSkewSec: 15,
		},
		validate: (artifacts) => ({
			isValid: artifacts.decoded.payload.isAdmin === false,
			credentials: 'hehe',
		}),
	});
	server.auth.strategy('admin_jwt_strategy', 'jwt', {
		keys: 'secret',
		verify: {
			aud: 'token',
			iss: 'urn:issuer:test',
			sub: false,
			nbf: true,
			exp: true,
			maxAgeSec: 14400, // 4 hours
			timeSkewSec: 15,
		},
		validate: (artifacts) => ({
			isValid: artifacts.decoded.payload.isAdmin === true,
			credentials: 'hehe',
		}),
	});

	/** ******************************************** */
	/* ********** User manipulation ***************** */
	/** ****************************************** */

	server.route({
		method: 'POST',
		path: '/register',
		handler: registerUser,
	});

	server.route({
		method: 'POST',
		path: '/login',
		handler: loginUser,
		config: {
			cors: {
				origin: ['*'],
				additionalHeaders: ['cache-control', 'x-requested-with'],
			},
		},
	});

	/** ******************************************** */
	/* ********** Product manipulation ***************** */
	/** ****************************************** */
	server.route({
		method: 'POST',
		path: '/shop',
		handler: createProduct,
		config: {
			auth: { strategies: ['admin_jwt_strategy'] },
			payload: {
				maxBytes: 1024 * 1024 * 5,
				multipart: {
					output: 'file',
				},
				parse: true,
			},
		},
	});
	server.route({
		method: 'PUT',
		path: '/shop/{id}',
		handler: modifyProduct,
		config: {
			auth: { strategies: ['admin_jwt_strategy'] },
		},
	});
	server.route({
		method: 'GET',
		path: '/shop',
		handler: getShop,
	});
	server.route({
		method: 'GET',
		path: '/shop/{id}',
		handler: getProductByID,
	});
	server.route({
		method: 'GET',
		path: '/shop/product',
		handler: getProduct,
	});
	server.route({
		method: 'DELETE',
		path: '/shop/{id}',
		handler: deleteProduct,
		config: {
			auth: { strategies: ['admin_jwt_strategy'] },
		},
	});
	/** ******************************************** */
	/* ********** Category manipulation ***************** */
	/** ****************************************** */
	server.route({
		method: 'POST',
		path: '/category',
		handler: createCategory,
		config: {
			auth: { strategies: ['admin_jwt_strategy'] },
		},
	});
	server.route({
		method: 'GET',
		path: '/category',
		handler: getCategory,
		config: {
			auth: { strategies: ['admin_jwt_strategy'] },
		},
	});
	server.route({
		method: 'PUT',
		path: '/category/{id}',
		handler: modifyCategory,
		config: {
			auth: { strategies: ['admin_jwt_strategy'] },
		},
	});
	server.route({
		method: 'DELETE',
		path: '/category/{id}',
		handler: deleteCategory,
		config: {
			auth: { strategies: ['admin_jwt_strategy'] },
		},
	});

	/** ******************************************** */
	/* ********** Image manipulation ***************** */
	/** ****************************************** */
	server.route({
		method: 'POST',
		path: '/uploadImage',
		handler: uploadImage,
		config: {
			payload: {
				maxBytes: 1024 * 1024 * 5,
				multipart: {
					output: 'file',
				},
				parse: true,
			},
		},
	});
	server.route({
		method: 'POST',
		path: '/createImage',
		handler: createImage,
		config: {
			payload: {
				maxBytes: 1024 * 1024 * 5,
				multipart: {
					output: 'file',
				},
				parse: true,
			},
		},
	});

	await server.start();
	console.log(`server is running on ${server.info.uri}`);
};

const start = async () => {
	await connectDb();
	await init();
};

export default start;
