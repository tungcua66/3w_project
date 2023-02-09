/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import debounce from 'lodash.debounce';

import { connect, useDispatch } from 'react-redux';
import Header from '../components/Header';

import { productSliceActions } from '../features/productReducer';
import { productsSliceActions, getProducts } from '../features/productsReducer';

const DivContainer = styled.div(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	margin: '1em',
	width: '50em',
}));

const User = ({
	userLogin, products, product, setProduct,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, []);

	const updateQuery = (e) => {
		const dummy = {
			_id: '1',
			title: e.target.value,
			price: 0,
			description: '',
		};
		setProduct(dummy);
	};
	const debounceOnChange = debounce(updateQuery, 1000);

	return (
		<>
			<Header />
			<h1>
				{`Bonjour ${userLogin.login}`}
			</h1>
			<input
				type="text"
				name=""
				placeholder="Search..."
				css={{
					margin: '1em',
				}}
				onChange={debounceOnChange}
			/>
			<DivContainer>
				<div>
					{products.filter((element) => {
						if (!product || element.title.trim()
							.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Turn into normal form
							.toLowerCase()
							.includes(product.title.trim()
								.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Turn into normal form
								.toLowerCase())) {
							return element;
						}
						return false;
					}).map((val) => (
						<div
							className={css({
								border: '1px solid hotpink',
								padding: '1em',
							})}
							key={val._id.toString()}
						>
							<p>{val.title}</p>
							<p>{val.price}</p>
							<p>{val.description}</p>
						</div>
					))}
				</div>

			</DivContainer>
		</>
	);
};

const mapStateToProps = (state) => ({
	userLogin: state.loginReducer.user,
	product: state.productReducer.product,
	products: state.productsReducer.products,

});

const mapDispatchToProps = {
	setProduct: productSliceActions.setProduct,

};

export default connect(mapStateToProps, mapDispatchToProps)(User);
