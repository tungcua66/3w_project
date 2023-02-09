import Boom from '@hapi/boom';
import Product from '../../model/Product.js';
// import createImage from '../image/createImage.js';

export default async (request) => {
	try {
		// const image = await createImage(request);
		const res = await Product.findOneAndUpdate({ _id: request.params.id },
			{ title: request.payload.title,
				price: request.payload.price,
				description: request.payload.description,
				categories: request.payload.categories,
				// image: image._id
			},
			{ new: true });
		console.log(res);
		return res;
	} catch (error) {
		return Boom.badRequest(error.message);
	}
};
