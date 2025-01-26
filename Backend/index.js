
import dotenv from 'dotenv'
dotenv.config()


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.js';
import { checkTokenAuthentication } from './middleware/authentication.js';
import User from './model/user.js';

mongoose.connect(process.env.mongodbURL)
.then(console.log("MongoDb is connected successfully"))

const app = express() ;
const PORT = 8000 ;

app.use(cookieParser()) ;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json()) 

app.get("/profile",checkTokenAuthentication,async (req,res)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    try {
        const user = req.user;
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

app.use('/user',userRouter) ;


app.listen(PORT,()=>console.log(`server is running on port ${PORT}`)) ;
