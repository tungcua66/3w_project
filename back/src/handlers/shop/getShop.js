import Boom from '@hapi/boom';
import Product from '../../model/Product.js';

export default async () => {
	try {
		// const shop = await Product.find({});
		const shop = await Product.find({})
			.populate('categories', { title: 1, _id: 0 })
			.sort([['title', 1], ['price', 'descending']]);
		return shop;
	} catch (error) {
		return Boom.badRequest('No shop found');
	}
};
