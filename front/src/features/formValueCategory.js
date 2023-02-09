import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	formValueCategory: {
		_id: null,
		title: '',
	},
};

export const formValueCategorySlice = createSlice({
	name: 'formValueProduct',
	initialState,
	reducers: {
		setFormValueCategory: (state, action) => {
			state.formValueCategory = action.payload;
		},
	},
});

export const formValueCategorySliceActions = formValueCategorySlice.actions;

export default formValueCategorySlice.reducer;
