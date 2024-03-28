import jwt from 'jsonwebtoken';
import userModel from '../../DB/Models/User.model.js';

export const authenticateUser =  (requiredRole) => async (req, res, next) => {
    const { authorization: token } = req.headers;
  
    if (!token) {
      return res.json({ message: 'Unauthorized - Token not provided' });
    }
   
    try {
      const decoded = await jwt.verify(token, process.env.LOGINSIG);
      req.user = decoded;
      if (req.user.role !== requiredRole) {
          return res.json({ message: 'Forbidden - Insufficient role' });
        }
      next();
    } catch (err) {
      return res.json({ message: 'Unauthorized - Invalid token' });
    }
  };
  
  
  export const ensureUserAdmin = (requiredRole) => async (req,res,next) => {
      const { authorization: token } = req.headers;
  
      if (!token) {
        return res.json({ message: 'Unauthorized - Token not provided' });
      }
    
      try {
        const decoded = await jwt.verify(token, process.env.LOGINSIG);
        req.user = decoded;
        if (req.user.role !== requiredRole) {
            return res.json({ message: 'Forbidden - Insufficient role' });
          }
          if(req.user.role == 'user' || req.user.role == 'admin' )
                 next();
      } catch (err) {
        return res.json({ message: 'Unauthorized - Invalid token' });
      }
  }


  export const auth = async (req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization.startsWith(process.env.BEARERTOKEN)){
      return res.status(400).json({message:"invalid authorization"});
    }
    const token = authorization.split(process.env.BEARERTOKEN)[1];
    const decoded = await jwt.verify(token, process.env.LOGINSIG);
    
    const authUser = await userModel.findById(decoded._id).select('name phone email ')
    req.user = authUser;
    next();
  }

  


  export default auth;