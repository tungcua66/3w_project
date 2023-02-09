import {
	BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';

import { useEffect } from 'react';
import { connect } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import { loginReducerSliceSliceActions } from './features/loginReducer';

import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Admin from './pages/Admin';
import Register from './pages/Register';
import User from './pages/User';

import Products from './components/adminComponents/product/Products';

const App = ({ userLogin, setUserLogin }) => {
	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setUserLogin(foundUser);
		}
	}, []);

	return (
		<Router>
			<ToastContainer />
			<Routes>
				<Route
					path="/"
					element={(
						<Login />
					)}
				/>
				<Route
					path="/register"
					element={(
						<Register />
					)}
				/>
				<Route
					path="/admin"
					element={userLogin.isAdmin ? (
						<Admin />
					) : <div>Forbidden</div>}
				/>
				{userLogin.isAdmin && (
					<Route
						path="/product"
						element={(
							<Products />
						)}
					/>
				)}
				{!userLogin.isAdmin && (
					<Route
						path="/user"
						element={(
							<User />
						)}
					/>
				)}
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</Router>
	);
};

const mapStateToProps = (state) => ({
	userLogin: state.loginReducer.user,
});

const mapDispatchToProps = {
	setUserLogin: loginReducerSliceSliceActions.setUserLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
