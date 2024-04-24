import {Schema, model} from "mongoose";


const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: { type: String, enum: ['user', 'admin', 'guest'], default: 'user' },
	status :{
		type:String,
		enum:['Activated', 'disabled'],
		required:true,
		default:'Activated'
		
	}
}, {
	timestamps:true
});

const userModel = model('User', userSchema);
export default userModel;