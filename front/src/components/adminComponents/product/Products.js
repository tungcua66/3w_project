import { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { connect, useDispatch } from 'react-redux';

import { productsSliceActions, getProducts } from '../../../features/productsReducer';
import { productSliceActions } from '../../../features/productReducer';
import { deleteProductThunk } from '../../../features/thunks/deleteThunk';

import Modal from '../../Modal';
import FormulaireProduct from './FormulaireProduct';

import { styleOne } from '../../../styles/Button';

const DivContainer = styled.div(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	margin: '1em',
}));

const Button = styled.button(({
	backgroundColor, position, alignSelf, margin, cursor, top,
}) => ({
	...styleOne,
	backgroundColor,
	position,
	top,
	alignSelf,
	margin,
	cursor,

}));

const Products = ({
	modalIsOpenned, setProductModalOpen, product, setProduct, loading, products, setProducts,
}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProducts());
		// console.log(Array.isArray(products));
	}, []);

	const handleModifyProduct = (_id, title, price, description) => {
		setProduct({
			_id,
			title,
			price,
			description,
		});

		// useDispatch
		setProductModalOpen(true);
	};

	const handleDeleteProduct = async (id) => {
		// dispatch(deleteProduct(id));
		dispatch(deleteProductThunk(id));
	};

	const handleCreateProduct = () => {
		setProduct({ ...product, _id: null });
		setProductModalOpen(true);
	};

	if (loading) return <p>Loading...</p>;

	return (
		<DivContainer>
			<div>
				{products.map((val) => (
					<div
						className={css({
							border: '1px solid #BDCDD6',
							borderRadius: '2px',
							padding: '1em',
						})}
						key={val._id.toString()}
					>
						<p>{val.title}</p>
						<p>{val.price}</p>
						<p>{val.description}</p>
						<Button
							className="modifyProductButton"
							backgroundColor="#d6ce90"
							type="button"
							onClick={() =>
								handleModifyProduct(
									val._id,
									val.title,
									val.price,
									val.description,
								)}
						>
							Modify
						</Button>
						<Button
							type="button"
							backgroundColor="#cc867e"
							className="deleteProduct"
							onClick={() => handleDeleteProduct(val._id)}
						>
							Delete
						</Button>
					</div>

				))}
			</div>
			<Button
				onClick={handleCreateProduct}
				top="2em"
				margin="5em"
				backgroundColor="#92cf84"
				position="sticky"
				alignSelf="flex-start"
				cursor="pointer"
			>
				Create product
			</Button>

			{modalIsOpenned && (
				<Modal>
					<FormulaireProduct />
				</Modal>
			)}
		</DivContainer>

	);
};

const mapStateToProps = (state) => (
	{
		modalIsOpenned: state.productsReducer.modalIsOpenned,

		product: state.productReducer.product,

		loading: state.productsReducer.loading,
		products: state.productsReducer.products,

	}
);

const mapDispatchToProps = {
	setProductModalOpen: productsSliceActions.setProductModalOpen,
	setProduct: productSliceActions.setProduct,
	setProducts: productsSliceActions.setProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
