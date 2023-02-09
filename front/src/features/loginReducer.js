import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as jose from 'jose';
import { toast } from 'react-toastify';
import toastStyle from '../helpers/toastStyle';

const initialValue = {
	login: '',
	password: '',
	status: '', // 'ERROR' | 'LOADING" | 'LOAD'
	isLoading: false,
	isError: false,
};

const initialUser = {
	isConnected: false,
	login: '',
	isAdmin: '',
	token: '',
};

export const submitLoginForm = createAsyncThunk(
	'loginReducer/submitLoginForm',
	async ({ login, password }) => {
		// console.log('im into submitLoginForm function');
		const userData = {
			login,
			password,
		};
		const request = await axios({
			method: 'POST',
			url: 'http://localhost:4242/login',
			data: userData,
		});
		return request.data;
	},
);

export const loginReducerSlice = createSlice({
	name: 'loginReducer',
	initialState: { value: initialValue, user: initialUser },
	reducers: {
		setFormValue: (state, action) => {
			state.value = action.payload;
		},
		setUserLogin: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: {
		[submitLoginForm.pending]: (state) => {
			state.value.status = 'pending';
			console.log('pending status');
		},
		[submitLoginForm.fulfilled]: (state, { payload }) => {
			console.log('fulfilled status');

			state.value.status = 'fulfilled';

			const user = {
				isConnected: true,
				login: payload.login,
				isAdmin: jose.decodeJwt(payload.token).isAdmin,
				token: payload.token,
			};

			state.user = user;

			localStorage.setItem(
				'user',
				JSON.stringify(user),
			);
		},
		[submitLoginForm.rejected]: (state) => {
			state.value.status = 'rejected';
			console.log('rejected status');
			toast.error('Login/password not correct', toastStyle);
		},
	},
});
export const loginReducerSliceSliceActions = loginReducerSlice.actions;

export default loginReducerSlice.reducer;
