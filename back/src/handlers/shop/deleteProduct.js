import Boom from '@hapi/boom';
import Product from '../../model/Product.js';

export default async (request) => {
	try {
		const product = await Product.findOne({ _id: request.params.id });
		if (product) {
			await Product.deleteOne({ _id: product._id });
			return product;
		}
		return 'No product found to be delete';
	} catch (error) {
		return Boom.badRequest(error.message);
	}
};
