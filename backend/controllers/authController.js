const userModel=require("../model/User");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const sendEmail =require("../utils/nodemailer")
const genToken=(id)=> {
  return jwt.sign({id},process.env.JWT,{expiresIn:'30d'});
}
// Register a new user 
const register=async (req,res)=> {
  const {name,email,password}=req.body;
  console.log(name,email,password);

  try {
    const existinguser=await userModel.findOne({email});
    // since email was the primary key 
    if(existinguser) {
      return res.status(403).json({
        message:"Bhai ye banda has already signed up.",
      })
    }
    // TODOS: Hash the password before saving to the database 
    // TODOS:Implement JWT token generation for authenticaion
    // TODOS: OTP Sending and verification for email confirmation 
    // TODO: Welcome  mail 
    const hashedPassword=await bcrypt.hash(password,10);

    const user =await userModel.create({name,email,password:hashedPassword});
    if(user) {
      const otp=Math.floor(100000 +Math.random()*900000).toString();


      const message=`
      Welcome to ShopNest, ${name}!
      Your OTP for ShopNest registration is ${otp}`;

      await sendEmail(email,`Welcome to ShopNest - Your OTP for Registration`,message)
      res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role || 'user',
        token:genToken(user._id),
      })
    }
  } catch(err) {
    console.log(err);
    return res.status(200).json({
      message:"We can't do anything "
    })
  } 
}


const login=async (req,res) => {
  const {email,password}=req.body;
  try {
    const existinguser=await userModel.findOne({email});
    // since email was the primary key 

    if(existinguser && (await bcrypt.compare(password,existinguser.password))) {
      const userRole = existinguser.role || 'user';
      res.json({
        _id:existinguser._id,
        name:existinguser.name,
        email: existinguser.email,
        role: userRole,
        token:genToken(existinguser._id)
      })
    }
    else {
      res.status(400).json({message:"Invalid email or password"})
    }
  } catch(err) {
    console.log(err);
  }
}


const getUsers = async (req,res) => {
  try {
    const users=await userModel.find({}).select('-password');
    res.status(200).json(users);
  } catch(err) {
    res.status(500).json({message:'Server error !'});
  }
}

module.exports={register,login,getUsers}