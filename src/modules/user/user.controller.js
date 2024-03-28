import orderModel from "../../../DB/Models/Order.model.js";
import userModel from "../../../DB/Models/User.model.js";

export const Users = async (req, res) => {
	try {
		const users = await userModel.find();
		return res.json({message: "success", users: users});
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}

export const update = async (req, res) => {
	try {
		const {name, phone, email, password} = req.body;
		const updatedUser = await userModel.findByIdAndUpdate(req._id, {
			name,
			phone,
			email,
			password
		}, {new: true});
		return res.json({message: "success", updatedUser: updatedUser})
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}

export const destroy = async (req, res) => {
	try {
		const {_id} = req.params;
		const deletedUser = await userModel.findById(_id);
		const user = await userModel.findByIdAndDelete(_id);
		return res.json({message: "success", deletedUser: deletedUser})
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}


export const getOrders = async (req,res) => {
	try {
		const {userId} = req.params;
		const orders = await orderModel.find({userId});
		return res.json({message:"success", orders});
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}


export const Profile = async (req,res)=>{
	const user = req.user;
	return res.status(200).json({message:"success", user});
}