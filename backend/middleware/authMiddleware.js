const jwt=require('jsonwebtoken');
const User =require('../model/User');

const protect=async (req,res,next) => {
  let token;
  if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')) {
    try {
      token= req.headers.authorization.split(' ')[1];
      const decoded=jwt.verify(token,process.env.JWT);
      req.user =await User.findById(decoded.id).select('-password');
      next();
    }
    catch(err) {
      res.status(401).json({messsage:"Not authorized, token failed"})
    }
  }

  if(!token) {
    res.status(401).json({message:"No token"});
  }
}

module.exports={protect}