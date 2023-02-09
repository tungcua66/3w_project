import { connect } from 'react-redux';
import Header from '../components/Header';
import Products from '../components/adminComponents/product/Products';
import Categories from '../components/adminComponents/category/Categories';

const Admin = ({ userLogin, pageNavigate }) => (
	<div style={{ backgroundColor: '#6096B4' }}>
		<Header />
		<h1>
			{`Bonjour ${userLogin.login}`}
		</h1>
		{pageNavigate === 'products page'
			&& (
				<Products />
			)}
		{pageNavigate === 'categories page'
			&& (
				<Categories />
			)}
	</div>
);

const mapStateToProps = (state) => ({
	userLogin: state.loginReducer.value,
	pageNavigate: state.pageNavigate.value,
});

export default connect(mapStateToProps)(Admin);
