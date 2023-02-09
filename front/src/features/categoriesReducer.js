import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	categories: [],
	loading: false,
	modalIsOpenned: false,
};

export const getCategories = createAsyncThunk(
	'categories/getCategories',
	async () => {
		try {
			const dataLs = JSON.parse(localStorage.getItem('user'));
			const res = await axios({
				method: 'GET',
				url: 'http://localhost:4242/category',
				headers: { Authorization: `Bearer ${dataLs.token}` },
			});
			return res.data;
		} catch (error) {
			return error.message;
		}
	},
);

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload;
			state.categories.sort((a, b) => ((a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)));
		},
		updateCategories: (state, action) => {
			state.categories = state.categories.map((element) => {
				if (element._id === action.payload._id) {
					return action.payload;
				}
				return element;
			});
		},
		setCategoryModalOpen: (state, action) => {
			state.modalIsOpenned = action.payload;
		},

	},
	extraReducers: {
		[getCategories.pending]: (state) => {
			state.loading = true;
		},
		[getCategories.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.categories = payload;
		},
		[getCategories.rejected]: (state) => {
			state.loading = false;
		},
	},
});

export const categoriesSliceActions = categoriesSlice.actions;

export default categoriesSlice.reducer;
