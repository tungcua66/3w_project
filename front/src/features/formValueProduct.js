import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	formValueProduct: {
		_id: null,
		title: '',
		price: '',
		description: '',
	},
};

export const formValueProductSlice = createSlice({
	name: 'formValueProduct',
	initialState,
	reducers: {
		setFormValueProduct: (state, action) => {
			state.formValueProduct = action.payload;
		},
	},
});

export const formValueProductSliceActions = formValueProductSlice.actions;

export default formValueProductSlice.reducer;
