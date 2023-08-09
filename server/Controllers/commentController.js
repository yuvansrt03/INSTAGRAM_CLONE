import mongoose from "mongoose";
import postModel from "../Models/postModel.js";
export const addComment = async(req,res)=>{
    try{
        const postId=req.params.postId;
        const post=await postModel.findById(postId);
        const newComment = {
            commentAuthorUserName: req.body.commentAuthorUserName,
            commentString:req.body.commentString,
            commentAuthorProfilePic:req.body.commentAuthorProfilePic,
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
export const deleteComment = async(req,res)=>{
    try{
        const postId=req.params.postId;
        const commentId=req.params.commentId;
        const post = await postModel.findByIdAndUpdate(
            postId,
            { $pull: { postcomments: { _id: commentId } } },
            { new: true }
          );
      
          if (!post) {
            return res.status(404).json({ error: 'Post not found' });
          }
          return res.status(200).json(post);
    }catch(error){
        res.status(400).json({error:error.message})
    }
}