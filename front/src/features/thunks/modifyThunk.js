// npm thunk
import axios from 'axios';
import { toast } from 'react-toastify';
import toastStyle from '../../helpers/toastStyle';

import { productsSliceActions } from '../productsReducer';
import { categoriesSliceActions } from '../categoriesReducer';

export const modifyProductThunk = (formValueProduct, product) => async (dispatch) => {
	try {
		const token = JSON.parse(localStorage.getItem('user'))?.token;
		const request = await axios({
			method: 'PUT',
			url: `http://localhost:4242/shop/${product._id}`,
			data: formValueProduct,
			headers: { Authorization: `Bearer ${token}` },
		});
		if (request.status === 200) {
			toast.success('Product has been updated successfully!', toastStyle);
		}
		dispatch(productsSliceActions.updateProducts(formValueProduct));
		dispatch(productsSliceActions.setProductModalOpen(false));
	} catch (error) {
		toast.error(error.message, toastStyle);
	}
};

export const modifyCategoryThunk = (formValueCategory, category) => async (dispatch) => {
	try {
		const token = JSON.parse(localStorage.getItem('user'))?.token;
		const request = await axios({
			method: 'PUT',
			url: `http://localhost:4242/category/${category._id}`,
			data: formValueCategory,
			headers: { Authorization: `Bearer ${token}` },
		});
		if (request.status === 200) {
			toast.success('Category has been updated successfully!', toastStyle);
		}

		dispatch(categoriesSliceActions.updateCategories(formValueCategory));

		dispatch(categoriesSliceActions.setCategoryModalOpen(false));
	} catch (error) {
		toast.error(error.message, toastStyle);
	}
};
