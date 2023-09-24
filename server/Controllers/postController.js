import postModel from '../Models/postModel.js'
import mongoose from 'mongoose';
export const deletePost = async(req,res)=>{
    try {
        const postId=req.params.postId
        await postModel.findByIdAndDelete(postId);
        const posts=await postModel.find()
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
export const getPost = async(req,res)=>{
    try {
        const postId = req.params.postId
        const post = await postModel.findById(postId);
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
export const getPosts = async(req,res)=>{
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export const updatePostLike = async(req,res)=>{
    try {
        const postId = req.params.postId
        const userId = req.params.userId
        const post=await postModel.findById(postId);
        const updatedLikes=post.postLikes;
        if(post.postLikes.get(userId)){
            updatedLikes.delete(userId);
        }
        else{
            updatedLikes.set(userId,true);
        }
        await postModel.findByIdAndUpdate(postId,{postLikes:updatedLikes});
        const updatedPost = await postModel.findById(postId);
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

export const createPost = async(req,res)=>{
    try {
        const filename=req.file.originalname.replace(/\s/g, "");
        const post = await postModel.create({
            postPost : filename,
            postAuthorId : req.body.postAuthorId,
            postAuthorName : req.body.postAuthorName,
            postAuthorProfilePic : req.body.postAuthorProfilePic,
            postDescription : req.body.postDescription,
        })
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
export const updatePost = async(req,res)=>{
    try {
        const postId=req.params.postId;
        const userId=req.body.userId;
        const post = await postModel.findById(postId);
        console.log(userId,post.postAuthorId)
        if(userId==post.postAuthorId){
            const body=req.body;
            await postModel.findByIdAndUpdate(postId,body);
            const updatedPost= await postModel.findById(postId);
            res.status(200).json(updatedPost);
        }
        else{
            res.status(403).json({error:"access denied. You are not the Author of This Post"});
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})   
    }
}
