const express=require("express");
const cors= require("cors")
const dotenv=require("dotenv");
dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());


app.get("/",(req,res)=> {
  res.send("ShopNest Backend is working properly!");
})

const PORT=process.env.PORT||5000;

app.listen(PORT,()=> {
  console.log(`Server is running on ${PORT}`);
})