import mongoose from 'mongoose';
// import Product from 'Product.js';

const categorySchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'title is required'],
		unique: [true, 'title is already taken'],
	},
});

export default mongoose.model('Category', categorySchema);
