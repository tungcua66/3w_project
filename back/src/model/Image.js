import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
	},
	img: {
		data: Buffer,
		contentType: String,
	},

});

export default mongoose.model('Image', imageSchema);
