const express=require("express");
const {register,login,getUsers}=require("../controllers/authController")
const router=express.Router();

const {adminMiddleware}=require("../middleware/adminMiddleware")
const {protect}=require("../middleware/authMiddleware")



// path or base address and then we gave the business logic right here 
router.post("/register",register);
router.post("/login",login)
router.get("/user",protect,adminMiddleware,getUsers)


module.exports=router