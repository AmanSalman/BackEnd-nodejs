import mongoose, {Schema, model} from "mongoose";

const orderSchema = new Schema({
	books: [
		{_id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			required: true
		},
		title: {
			type: String,
			ref: 'Book',
			required: true
		}}
	],
	location: {
		type: String,
		enum: [
			'WestBank', 'Location2'
		],
		required: true
	},
	totalPrice: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		enum: [
			'Pending', 'Accepted', 'Rejected'
		],
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});


const orderModel = model('Order', orderSchema);
export default orderModel;
