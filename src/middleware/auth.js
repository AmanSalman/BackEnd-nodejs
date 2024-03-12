import jwt from 'jsonwebtoken';

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


  const auth = (req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({message:"Unauthorized - Token not provided"});
    }
    const decoded = jwt.verify(token, process.env.LOGINSIG);
    req._id = decoded._id;
    next();
  }


  export default auth;