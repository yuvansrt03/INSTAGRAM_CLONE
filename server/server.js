import  express  from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from 'multer';
import authrouter from './Routers/authrouter.js'
import userRouter from "./Routers/userRouter.js";
import { createUser } from "./Controllers/authController.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config()
const PORT=process.env.PORT || 5001
const app=express()
const __filename=   fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use('/auth',authrouter);
app.use('/users',userRouter);
app.use('/assets',express.static(path.join(__dirname,"public/assets")));
console.log(path.join(__dirname,"public/assets"))
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("DB connected successfully");
  }).catch(error=>{
    console.log({error:error.message});
  });

const multerStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"public/assets")
    },
    filename:(req, file, cb)=>{
        const filename=file.originalname.replace(/\s/g, "");
        cb(null,filename);
    }
})

const upload=multer({storage:multerStorage});

app.post('/auth/register',upload.single('Image'),createUser);

app.get('/',(req,res)=>{
    res.send("hey")
})

app.listen(PORT,()=>{
    console.log("listening on port ", PORT);
})