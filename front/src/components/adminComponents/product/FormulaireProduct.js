import { useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { connect, useDispatch } from 'react-redux';

import toastStyle from '../../../helpers/toastStyle';
// import { setModalOpenSliceAction } from '../../../features/modalReducer';
import { productsSliceActions } from '../../../features/productsReducer';
import { formValueProductSliceActions } from '../../../features/formValueProduct';
import { createProductThunk } from '../../../features/thunks/createThunk';
import { modifyProductThunk } from '../../../features/thunks/modifyThunk';

const TextArea = styled.textarea(() => ({
	backgroundColor: 'lightblue',
	width: '35em',
	height: '10em',
	padding: '2px',
	margin: '2px',
	textAlign: 'center',
}));

const FormulaireProduct = ({
	product, products, setProducts, setProductModalOpen, updateProducts,
	formValueProduct, setFormValueProduct,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		setFormValueProduct(product);
	}, []);
	const handleChange = (event) => {
		setFormValueProduct({
			...formValueProduct,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// const token = JSON.parse(localStorage.getItem('user'))?.token;
			if (product._id) { // _id exists ==> we are in modify product case
				dispatch(modifyProductThunk(formValueProduct, product));
			} else {
				dispatch(createProductThunk(formValueProduct));
			}
		} catch (error) {
			toast.error(error.response?.data?.message || 'Error 404', toastStyle);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<p>Product form</p>
				<input
					type="title"
					name="title"
					placeholder="enter a title"
					value={formValueProduct.title}
					onChange={handleChange}
				/>
				<input
					type="price"
					name="price"
					placeholder="enter a price"
					value={formValueProduct.price}
					onChange={handleChange}
				/>
				<TextArea
					type="description"
					name="description"
					placeholder="enter a short description"
					value={formValueProduct.description}
					onChange={handleChange}
				/>

				<button
					type="submit"
				>
					Validate
				</button>

			</form>
		</div>
	);
};

const mapStateToProps = (state) => (
	{
		product: state.productReducer.product,
		products: state.productsReducer.products,
		formValueProduct: state.formValueProduct.formValueProduct,
	}
);

const mapDispatchToProps = {
	setProductModalOpen: productsSliceActions.setProductModalOpen,
	setFormValueProduct: formValueProductSliceActions.setFormValueProduct,

	setProducts: productsSliceActions.setProducts,
	updateProducts: productsSliceActions.updateProducts,

};

export default connect(mapStateToProps, mapDispatchToProps)(FormulaireProduct);
