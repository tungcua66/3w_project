import Boom from '@hapi/boom';
import Product from '../../model/Product.js';

export default async (request) => {
	try {
		// console.log(request.params.id);
		const product = await Product.findById(request.params.id)
			.populate({ path: 'categories', select: { _id: 0, title: 1 } });
		console.log(product);
		return product;
	} catch (error) {
		return Boom.badRequest('Id not correct');
	}
};
