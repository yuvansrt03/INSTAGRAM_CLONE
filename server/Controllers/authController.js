import express from 'express'
import  userModel  from '../Models/usermodel.js';
export const getUsers = async(req,res)=>{
    try {
        const users=await userModel.find({});
        res.send(users);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
export const findUser=async(req,res)=>{
    try {
        const user=await userModel.findOne({userUserName: req.body.userUserName});
        if(user){
            if(user.userUserName==req.body.userUserName && user.userPassword==req.body.userPassword){
                res.status(200).send(user)
            }
            else{
                res.status(400).json({error:"invalid password"})
            }
        }
        else{
            res.status(404).json({error:"invalid credentials"});
        }
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}
export const createUser = async(req,res)=>{
    try{
        let filename;
        if(req.file){
            filename=req.file.originalname.replace(/\s/g, "");
        }
        else{
            filename="nopic.jpg";
        }
        const user = await userModel.create({
            userUserName:req.body.userUserName,
            userName:req.body.userName,
            userEmail:req.body.userEmail,
            userPassword:req.body.userPassword,
            userDOB:req.body.userDOB,
            userProfileImg:filename
        });
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

