import Boom from '@hapi/boom';
import Category from '../../model/Category.js';

const modifyCategory = async (request) => {
	try {
		const res = await Category.findOneAndUpdate({ _id: request.params.id },
			{ title: request.payload.title },
			{ new: true });
		return res;
	} catch (error) {
		return Boom.badRequest(error.message);
	}
};

export default modifyCategory;
