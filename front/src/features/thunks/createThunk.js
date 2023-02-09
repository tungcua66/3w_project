// npm thunk
import axios from 'axios';
import { toast } from 'react-toastify';
import toastStyle from '../../helpers/toastStyle';

import { productsSliceActions } from '../productsReducer';
import { categoriesSliceActions } from '../categoriesReducer';

export const createProductThunk = (formValueProduct) => async (dispatch, getState) => {
	try {
		const token = JSON.parse(localStorage.getItem('user'))?.token;
		const request = await axios({
			method: 'POST',
			url: 'http://localhost:4242/shop',
			data: formValueProduct,
			headers: { Authorization: `Bearer ${token}` },
		});
		toast.success(
			`${JSON.stringify(request.data.title)} has been added to the database!`,
			toastStyle,
		);
		const { products } = getState().productsReducer;
		dispatch(productsSliceActions.setProducts([...products, request.data]));
		dispatch(productsSliceActions.setProductModalOpen(false));
	} catch (error) {
		toast.error(error.message, toastStyle);
	}
};

export const createCategoryThunk = (formValueCategory) => async (dispatch, getState) => {
	try {
		const token = JSON.parse(localStorage.getItem('user'))?.token;
		const request = await axios({
			method: 'POST',
			url: 'http://localhost:4242/category',
			data: formValueCategory,
			headers: { Authorization: `Bearer ${token}` },
		});
		toast.success(`${JSON.stringify(request.data.title)}
                        has been added to the database!`, toastStyle);

		const { categories } = getState().categoriesReducer;
		dispatch(categoriesSliceActions.setCategories([...categories, request.data]));
		dispatch(categoriesSliceActions.setCategoryModalOpen(false));
	} catch (error) {
		toast.error(error.message, toastStyle);
	}
};
