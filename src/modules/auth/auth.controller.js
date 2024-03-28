import userModel from "../../../DB/Models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
		const {name, phone, email, password,role} = req.body;
		const user = await userModel.findOne({email});
		if(user){
			return res.status(409).json({message:"email already exists"})
		}
        const hashPassword = await bcrypt.hash(password,process.env.SALTROUND);
		const addedUser = userModel.create({name, phone, email, password:hashPassword,role})
		if(!addedUser){
			return res.status(500).json({message: "error while creating user"});
		}
		return res.status(201).json({message: "success", createdUser: addedUser})
}

export const signIn = async (req, res) => {
		const {email, password} = req.body;
		const user = await userModel.findOne({email});
		if (!user) {
            return res.status(400).json({message: "invalid data"});
		} 
        
        const check = await bcrypt.compare(password, user.password);
        if(!check){
            return res.status(400).json({message: "invalid data"}); 
        }

        const token = jwt.sign({_id:user._id, role:user.role,name:user.name}, process.env.LOGINSIG , {expiresIn:'1h'});
        return res.status(201).json({message: "success", token});
}


