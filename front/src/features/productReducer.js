import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	product: {
		_id: null,
		title: '',
		price: '',
		description: '',
	},
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProduct: (state, action) => {
			state.product = action.payload;
		},

	},
});

export const productSliceActions = productSlice.actions;

export default productSlice.reducer;
