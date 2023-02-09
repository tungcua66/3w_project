import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import toastStyle from '../helpers/toastStyle';

// test if github down or not

const initialState = {
	search: null,
	products: [],
	loading: false,
	modalIsOpenned: false,
};

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async () => {
		try {
			const res = await axios({
				method: 'GET',
				url: 'http://localhost:4242/shop',
			});
			return res.data;
		} catch (error) {
			return error.message;
		}
	},
);

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
			state.products.sort((a, b) => ((a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)));
		},
		updateProducts: (state, action) => {
			state.products = state.products.map((element) => {
				if (element._id === action.payload._id) {
					return action.payload;
				}
				return element;
			});
		},
		setProductModalOpen: (state, action) => {
			state.modalIsOpenned = action.payload;
		},
		setSearch: () => {},

	},
	extraReducers: {
		[getProducts.pending]: (state) => {
			state.loading = true;
		},
		[getProducts.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.products = payload;
		},
		[getProducts.rejected]: (state) => {
			state.loading = false;
		},

	},
});

export const productsSliceActions = productsSlice.actions;

export default productsSlice.reducer;
