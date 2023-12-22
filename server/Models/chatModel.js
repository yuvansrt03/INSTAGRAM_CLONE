import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    senderId:{
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    chatMessage:{
        type:String,
        required:true
    }},{
        timestamps:true
    }
)
const chatModel=mongoose.model('Chat',chatSchema);
export default chatModel;
