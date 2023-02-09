// npm thunk
import axios from 'axios';
import * as jose from 'jose';
import { toast } from 'react-toastify';
import toastStyle from '../../helpers/toastStyle';

import { loginReducerSliceSliceActions } from '../loginReducer';

export const submitLoginForm = ({ login, password }) => async (dispatch) => {
	try {
		const userData = {
			login,
			password,
		};
		const request = await axios({
			method: 'POST',
			url: 'http://localhost:4242/login',
			data: userData,
		});
		if (request.status === 200) {
			const user = {
				isConnected: true,
				login: request.data.login,
				isAdmin: jose.decodeJwt(request.data.token).isAdmin,
				token: request.data.token,
			};
			localStorage.setItem('user', JSON.stringify(user));
			dispatch(loginReducerSliceSliceActions.setUserLogin(user));
		}
	} catch (error) {
		toast.error('Login/password not correct', toastStyle);
	}
};
