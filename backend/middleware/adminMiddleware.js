const adminMiddleware=async (req,res,next)=> {
  // since isse pehle wale middleware mai maine 
  console.log(req.user);
  if(req.user && req.user.role==='admin') {
    next();
  } else {
    res.status(403).json({
      message:"Access denied , admin only"
    })
  }
};

module.exports= {adminMiddleware}