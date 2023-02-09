import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'title is required'],
		unique: [true, 'title already taken'],
	},
	price: {
		type: Number,
		required: [true, 'price is required'],
		match: [/^[0-9]$/, 'price not valid: must be number'],
	},
	description: {
		type: String,
	},
	categories: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Category',
	}],
	image: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Image',
	},
});

export default mongoose.model('Product', productSchema);
