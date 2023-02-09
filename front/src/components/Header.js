import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Product } from '../assets/product.svg';
import { ReactComponent as Category } from '../assets/category.svg';
import { ReactComponent as Logout } from '../assets/logout.svg';

import { setPageNavigateSliceActions } from '../features/pageNavigate';

const DivHeader = styled.div(({ height }) => ({
	height,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	border: '2px solid #BDCDD6',
}));

const DivSvg = styled.div(({ width }) => ({
	width,
	height: 'fit-content',
	margin: '5px',
	cursor: 'pointer',
	display: 'inline-block',
}));

const Header = ({ setPageNavigate, userLogin }) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.clear();
		navigate('/');
		window.location.reload(false);
	};

	return (
		<DivHeader height="auto">
			<DivSvg width="6em" onClick={() => setPageNavigate('products page')}>
				<Logo />
			</DivSvg>
			{userLogin.isAdmin
				&& (
					<DivSvg width="4em" height="3em" onClick={() => setPageNavigate('products page')}>
						<Product />
						<p> Product</p>
					</DivSvg>
				)}
			{userLogin.isAdmin && (
				<DivSvg width="4em" height="3em" onClick={() => setPageNavigate('categories page')}>
					<Category />
					<p> Category</p>

				</DivSvg>
			)}
			<DivSvg width="3em" height="10em" onClick={() => handleLogout()}>
				<Logout />
				<p> Logout</p>
			</DivSvg>
		</DivHeader>
	);
};

const mapStateToProps = (state) => ({
	userLogin: state.loginReducer.user,
});

const mapDispatchToProps = {
	setPageNavigate: setPageNavigateSliceActions.setPageNavigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
