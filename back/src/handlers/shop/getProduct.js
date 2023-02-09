import Boom from '@hapi/boom';
import Product from '../../model/Product.js';

export default async (request) => {
	try {
		let res;
		const searchOption = Object.entries(request.query).filter((e) => !e[0].startsWith('$'));
		const field = searchOption[0][0];
		const value = searchOption[0][1];
		// has sort option
		if (await Object.prototype.hasOwnProperty.call(request.query, '$sort')) {
			const sortOptionInText = await request.query.$sort;
			const sortOption = await sortOptionInText.substring(1, sortOptionInText.length - 1).split(',');
			for (let i = 0; i < sortOption.length; i++) {
				if (!sortOption[i].startsWith('-')) {
					sortOption[i] = sortOption[i].concat(':ascending');
				} else {
					sortOption[i] = sortOption[i].slice(1); console.log(sortOption[i]);
					sortOption[i] = sortOption[i].concat(':descending');
				}
				sortOption[i] = sortOption[i].split(':');
			}
			res = await Product.find({ [field]: { $regex: value, $options: 'i' } }).sort(sortOption);
		} else {
			res = await Product.find({ [field]: { $regex: value, $options: 'i' } }).sort({ title: 1 });
		}
		return res.length > 0 ? res : 'No product found!';
	} catch (error) {
		return Boom.badRequest(error.message);
	}
};
