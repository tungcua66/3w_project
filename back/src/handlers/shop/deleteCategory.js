import Boom from '@hapi/boom';
import Category from '../../model/Category.js';

const deleteCategory = async (request) => {
	try {
		const res = await Category.findByIdAndDelete(request.params.id);
		return res;
	} catch (error) {
		return Boom.badRequest(error.message);
	}
};

export default deleteCategory;
