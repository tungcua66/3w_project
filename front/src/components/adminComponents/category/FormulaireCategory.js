import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { connect, useDispatch } from 'react-redux';

import toastStyle from '../../../helpers/toastStyle';
// import { setModalOpenSliceAction } from '../../../features/modalReducer';
import { formValueCategorySliceActions } from '../../../features/formValueCategory';
import { categoriesSliceActions } from '../../../features/categoriesReducer';
import { createCategoryThunk } from '../../../features/thunks/createThunk';
import { modifyCategoryThunk } from '../../../features/thunks/modifyThunk';

const FormulaireCategory = ({
	category, categories, setCategories, setCategoryModalOpen, updateCategories,
	formValueCategory, setFormValueCategory,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		setFormValueCategory(category);
	}, []);
	const handleChange = (event) => {
		setFormValueCategory({
			...formValueCategory,
			[event.target.name]: event.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (category._id) { // _id exists ==> we are in modify category case
				dispatch(modifyCategoryThunk(formValueCategory, category));
			} else { // we dont have _id==> because we want to create product into db
				dispatch(createCategoryThunk(formValueCategory));
			}
		} catch (error) {
			toast.error(`${formValueCategory.title} is already existed!`, toastStyle);
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<p>Category form</p>
				<input
					type="title"
					name="title"
					placeholder="enter a category name"
					value={formValueCategory.title}
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
		category: state.categoryReducer.category,
		categories: state.categoriesReducer.categories,
		formValueCategory: state.formValueCategory.formValueCategory,

	}
);

const mapDispatchToProps = {
	setCategoryModalOpen: categoriesSliceActions.setCategoryModalOpen,
	setFormValueCategory: formValueCategorySliceActions.setFormValueCategory,

	setCategories: categoriesSliceActions.setCategories,
	updateCategories: categoriesSliceActions.updateCategories,

};

export default connect(mapStateToProps, mapDispatchToProps)(FormulaireCategory);
