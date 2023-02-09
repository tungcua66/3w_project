import { createSlice } from '@reduxjs/toolkit';

const initialValue = false;

export const modalReducerSlice = createSlice({
	name: 'modalReducer',
	initialState: { value: initialValue },
	reducers: {
		setModalOpen: (state, action) => {
			state.value = action.payload;
		},

	},
});

export const setModalOpenSliceAction = modalReducerSlice.actions;

export default modalReducerSlice.reducer;
