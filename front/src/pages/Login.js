import 'react-toastify/dist/ReactToastify.css';
import { connect, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { loginReducerSliceSliceActions } from '../features/loginReducer';
import { submitLoginForm } from '../features/thunks/loginThunk';

const Container = styled.div(() => ({
	height: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#6096B4',
}));

const FormContainer = styled.form(() => ({
	position: 'relative',
	zIndex: 1,
	background: ' #93BFCF',
	maxWidth: '360px',
	margin: '0 auto 100px',
	padding: '45px',
	textAlign: 'center',
	boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
}));

const InputField = styled.input(() => ({
	fontFamily: '"Roboto", sans-serif',
	outline: '0',
	background: '#f2f2f2',
	width: '100%',
	border: '0',
	margin: '0 0 15px',
	padding: '15px',
	boxSizing: 'border-box',
	fontSize: '14px',
}));

const Button = styled.button(() => ({
	fontFamily: '"Roboto", sans-serif',
	textTransform: 'uppercase',
	outline: '0',
	background: '#EEE9DA',
	width: '100%',
	border: '0',
	padding: '15px',
	// color: '#BDCDD6',
	fontSize: '14px',
	transition: 'all 0.3 ease',
	cursor: 'pointer',
}));

const Login = ({
	userLogin, setUserLogin, setFormValue, loginFormValue,
}) => {
	// const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(submitLoginForm(loginFormValue));
	};

	const handleChange = (event) => {
		setFormValue({
			...loginFormValue,
			[event.target.name]: event.target.value,
		});
	};
	if (userLogin.login) {
		if (userLogin.isAdmin) {
			return <Navigate to="/admin" />;
		}
		return <Navigate to="/user" />;
	}

	return (
		<Container>
			<FormContainer onSubmit={handleSubmit}>
				<p>Login Form</p>
				<InputField
					type="login"
					name="login"
					placeholder="login"
					value={loginFormValue.login}
					onChange={handleChange}
				/>
				<InputField
					type="password"
					name="password"
					placeholder="password"
					value={loginFormValue.password}
					onChange={handleChange}
				/>
				<Button
					type="submit"
					onClick={handleSubmit}
				>
					Login
				</Button>
				<p className="message">
					Not registered?
					{' '}
					<a href="/register">Create an account</a>
				</p>
			</FormContainer>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	userLogin: state.loginReducer.user,
	loginFormValue: state.loginReducer.value,
	sta: state.loginReducer.value.status,
});

const mapDispatchToProps = {
	setFormValue: loginReducerSliceSliceActions.setFormValue,
	setUserLogin: loginReducerSliceSliceActions.setUserLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
