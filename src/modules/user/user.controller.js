import orderModel from "../../../DB/Models/Order.model.js";
import userModel from "../../../DB/Models/User.model.js";

export const Users = async (req, res) => {
	try {
		const users = await userModel.find({role:'user'});
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
	const user = await userModel.findById(req.user._id);
	return res.status(200).json({message:"success", user});
}

export const Disable = async (req,res)=>{
	const {_id} = req.params;
	if (!_id) {
		return res.status(400).json({ message: "Invalid user ID" });
	}

	const userStatus = await userModel.findById(_id).select('status');
	if(userStatus.status == "disabled"){
		return res.status(200).json({ message: 'User is already disabled' });
	}

	const user = await userModel.findByIdAndUpdate(_id, { status: 'disabled' }, { new: true });
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.status(200).json({ message: 'User disabled successfully' });
}


export const Activate = async (req,res)=>{
	const {_id} = req.params;
	const check = await userModel.findById(_id);
	if (!check) {
		return res.status(400).json({ message: "Invalid user ID" });
	}
	
	const userStatus = await userModel.findById(_id).select('status');
	if(userStatus.status == "Activated"){
		return res.status(200).json({ message: 'User is already Activated' });
	}

	const user = await userModel.findByIdAndUpdate(_id, { status: 'Activated' }, { new: true });
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.status(200).json({ message: 'User Activated successfully' });
}