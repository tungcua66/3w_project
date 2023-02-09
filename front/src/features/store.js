import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import loginReducer from './loginReducer';

import modalReducer from './modalReducer';
import pageNavigate from './pageNavigate';

import formValueProduct from './formValueProduct';
import formValueCategory from './formValueCategory';

import productReducer from './productReducer';
import productsReducer from './productsReducer';

import categoryReducer from './categoryReducer';
import categoriesReducer from './categoriesReducer';

const store = configureStore({
	reducer: {
		modalReducer,
		pageNavigate,

		loginReducer,

		formValueProduct,
		productReducer,
		productsReducer,

		formValueCategory,
		categoryReducer,
		categoriesReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
