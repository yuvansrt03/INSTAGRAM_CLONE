import mongoose from "mongoose";
import chatModel from "../Models/chatModel.js";
export const addChats = async (req, res) => {
  try {
    const newChat = new chatModel({
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      chatMessage: req.body.chatMessage,
    });
    const chat = await newChat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getChats = async (req, res) => {
    try{
        const chats=await chatModel.find();
        res.status(200).json(chats);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

export const getIndividualChats = async (req, res) => {
    try{
      const chats = await chatModel.find({$or:[{senderId:req.params.userId,receiverId:req.params.friendId},{senderId:req.params.friendId,receiverId:req.params.userId}]}).sort('createdAt');
      res.status(200).json(chats);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}