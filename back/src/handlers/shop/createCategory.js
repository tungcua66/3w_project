import Boom from '@hapi/boom';
import Category from '../../model/Category.js';

export default async (request) => {
	try {
		const category = await Category.create({
			title: request.payload.title,
		});
		return category;
	} catch (error) {
		return Boom.badRequest(error.message);
	}
};
