// npm thunk
import axios from 'axios';
import { toast } from 'react-toastify';
import toastStyle from '../../helpers/toastStyle';

import { productsSliceActions } from '../productsReducer';
import { categoriesSliceActions } from '../categoriesReducer';

export const deleteProductThunk = (id) => async (dispatch, getState) => {
	try {
		const token = JSON.parse(localStorage.getItem('user'))?.token;
		await axios({
			method: 'DELETE',
			url: `http://localhost:4242/shop/${id}`,
			headers: { Authorization: `Bearer ${token}` },
		});
		const prevProducts = getState().productsReducer.products;
		const current = [...prevProducts.filter((product) => product._id !== id)];
		dispatch(productsSliceActions.setProducts(current));
		// Call toast message
		toast.info('Product has been deleted successfully!!', toastStyle);
	} catch (error) {
		toast.error(error.message, toastStyle);
	}
};

export const deleteCategoryThunk = (id) => async (dispatch, getState) => {
	try {
		const token = JSON.parse(localStorage.getItem('user'))?.token;
		const res = await axios({
			method: 'DELETE',
			url: `http://localhost:4242/category/${id}`,
			headers: { Authorization: `Bearer ${token}` },
		});
		if (res.status === 200) {
			const prevCategories = getState().categoriesReducer.categories;
			const current = [...prevCategories.filter((category) => category._id !== id)];

			dispatch(categoriesSliceActions.setCategories(current));
			toast.info('Category has been deleted successfully!!', toastStyle);
		}
	} catch (error) {
		toast.error(error.message, toastStyle);
	}
};
