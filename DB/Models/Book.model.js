import mongoose, {Schema, model} from "mongoose";

const bookSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	publishingHouse: {
		type: String,
		required: true
	},
	categoryId: {
		type: String,
		ref: 'Category',
		required: true
	}
});

const bookModel = model('Book', bookSchema);
export default bookModel;
