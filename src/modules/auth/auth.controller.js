import userModel from "../../../DB/Models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const GetAuth = (req, res) => {
	return res.json({message: 'Auth success'});
}

export const Register = async (req, res) => {
	try {
		const {name, phone, email, password,role} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
		const user = userModel({name, phone, email, password:hashPassword,role})
		const addedUser = await user.save();
		return res.json({message: "success", createdUser: addedUser})
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}

export const signIn = async (req, res) => {
	try {
		const {email, password} = req.body;
        console.log(password);
		const user = await userModel.findOne({email});
        console.log(user)
		if (!user) {
            return res.json({message: "invalid data"});
		} 
        
        const check = await bcrypt.compare(password, user.password);
        if(!check){
            return res.json({message: "invalid data"}); 
        }

        const token = jwt.sign({ _id:user._id, role:user.role}, process.env.LOGINSIG , {expiresIn:'1h'});
        
        return res.json({message: "success", token});
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}


