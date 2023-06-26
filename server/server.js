import  express  from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authrouter from './Routers/authrouter.js'
import userRouter from "./Routers/userRouter.js";
import bodyParser from "body-parser";
dotenv.config()
const PORT=process.env.PORT || 5001
const app=express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use('/auth',authrouter);
app.use('/users',userRouter);

mongoose.connect(process.env.MONGO_DB);
app.get('/',(req,res)=>{
    res.send("hey")
})

app.listen(PORT,()=>{
    console.log("listening on port ", PORT);
})