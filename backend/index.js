require('dotenv').config();
const express=require("express");
const cors= require("cors")
const dotenv=require("dotenv");
const path = require('path');
dotenv.config();

const connectDb=require("./config/db");
const app=express();

app.use(express.json());

connectDb();

app.use(express.json());
// Set CORS for frontend URL / allow single-node deploy
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
  credentials: true
}));

// so basically we have implemented the router path here 


// now since we have made the very first of the user thing that is authentication so now we have to make the produvt wala part right 
app.use('/api/auth',require('./routes/authRoutes'))

// iske hamne alag alag routes bnaye routes folder mai iss main auth se related 

app.use("/api/products",require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use("/api/payment",require('./routes/paymentRoutes'));
app.use("/api/analytics",require('./routes/analyticsRoutes'));


// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('ShopNest API is running in Development mode...');
  });
}


// This is our Home page right
app.get("/",(req,res)=> {
  res.send("ShopNest Backend is working properly!");
})

const PORT=process.env.PORT||5000;

app.listen(PORT,()=> {
  console.log(`Server is running on ${PORT}`);
})