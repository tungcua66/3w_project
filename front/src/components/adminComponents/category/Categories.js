import { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { connect, useDispatch } from 'react-redux';

import { categorySliceActions } from '../../../features/categoryReducer';
import { deleteCategoryThunk } from '../../../features/thunks/deleteThunk';
import { categoriesSliceActions, getCategories } from '../../../features/categoriesReducer';

import Modal from '../../Modal';
import FormulaireCategory from './FormulaireCategory';

import { styleOne } from '../../../styles/Button';

const DivContainer = styled.div(() => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'left',
	margin: '1em',
	height: '100vh',
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

const Categories = ({
	modalIsOpenned, setCategoryModalOpen, category, setCategory, categories, setCategories,
}) => {
	// redux toolkit

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories());
		// console.log(Array.isArray(products));
	}, []);

	const handleModifyCategory = (_id, title) => {
		setCategory({
			_id,
			title,
		});
		setCategoryModalOpen(true);
	};

	const handleDeleteCategory = async (id) => {
		dispatch(deleteCategoryThunk(id));
	};

	const handleCreateCategory = () => {
		setCategory({ ...category, _id: null });
		setCategoryModalOpen(true);
	};

	return (
		<DivContainer>
			<div>
				{categories.map((val) => (
					<div
						className={css({
							border: '1px solid #BDCDD6',
							borderRadius: '2px',
							padding: '1em',
						})}
						key={val._id.toString()}
					>
						<p>{val.title}</p>
						<Button
							type="button"
							backgroundColor="#d6ce90"
							className="modifyProductButton"
							onClick={() => handleModifyCategory(val._id, val.title)}
						>
							Modify
						</Button>
						<Button
							type="button"
							backgroundColor="#cc867e"
							className="deleteCategory"
							onClick={() => handleDeleteCategory(val._id)}
						>
							Delete
						</Button>
					</div>

				))}
			</div>
			<Button
				onClick={handleCreateCategory}
				top="2em"
				margin="5em"
				backgroundColor="#92cf84"
				position="sticky"
				alignSelf="flex-start"
				cursor="pointer"
			>
				Create category
			</Button>
			{modalIsOpenned && (
				<Modal>
					<FormulaireCategory />
				</Modal>
			)}

		</DivContainer>
	);
};

const mapStateToProps = (state) => (
	{
		modalIsOpenned: state.categoriesReducer.modalIsOpenned,
		category: state.categoryReducer.category,
		categories: state.categoriesReducer.categories,
	}
);

const mapDispatchToProps = {
	setCategoryModalOpen: categoriesSliceActions.setCategoryModalOpen,
	setCategory: categorySliceActions.setCategory,
	setCategories: categoriesSliceActions.setCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
