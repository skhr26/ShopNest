const mongoose=require("mongoose");

const connectDb =async ()=> {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongodb conneced successfully!');
  }
  catch(err) {
    console.error('MongoDB connection failed !',error.message);
    process.exit(1);
  }
  
}

module.exports=connectDb