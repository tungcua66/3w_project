import Boom from '@hapi/boom';
import Category from '../../model/Category.js';

export default async () => {
	try {
		// const shop = await Category.find({});
		const category = await Category.find({}).sort([['title', 1], ['title', 'ascending']]);
		return category;
	} catch (error) {
		return Boom.badRequest('No category found');
	}
};
