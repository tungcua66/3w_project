import Boom from '@hapi/boom';
import Product from '../../model/Product.js';
// import createImage from '../image/createImage.js';

export default async (request) => {
	try {
		// let image;
		// if (request.payload.image.filename !== undefined) {
		// 	image = await createImage(request);
		// 	console.log(image);
		// }

		const product = await Product.create({
			title: request.payload.title,
			price: request.payload.price,
			description: request.payload.description,
			categories: request.payload.categories,
			// image: image._id,
		});
		return product;
	} catch (error) {
		return Boom.badRequest(error.message);
	}
};
