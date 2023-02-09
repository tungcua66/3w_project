import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	category: {
		_id: null,
		title: '',
	},
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.category = action.payload;
		},

	},
});

export const categorySliceActions = categorySlice.actions;

export default categorySlice.reducer;
