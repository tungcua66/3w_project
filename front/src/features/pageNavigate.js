import { createSlice } from '@reduxjs/toolkit';

const initialValue = 'products page';

export const pageNavigateSlice = createSlice({
	name: 'pageNavigate',
	initialState: { value: initialValue },
	reducers: {
		setPageNavigate: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const setPageNavigateSliceActions = pageNavigateSlice.actions;

export default pageNavigateSlice.reducer;
