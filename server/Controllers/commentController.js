import mongoose from "mongoose";
import postModel from "../Models/postModel.js";
export const addComment = async(req,res)=>{
    try{
        console.log("reqqq",req.body);
        const postId=req.params.postId;
        const post=await postModel.findById(postId);
        const newComment = {
            commentAuthorUserName: req.body.commentAuthorUserName,
            commentString:req.body.commentString,
          };
        if(post._id){
            await postModel.findByIdAndUpdate(postId,{$push:{postcomments:newComment}})
            const updatedPost=await postModel.findById(postId);
            res.status(200).json(updatedPost);
        }
        else{
            res.status(404).json("Error");
        }

    }catch(error){
        res.status(400).json({error:error.message});
    }
}
