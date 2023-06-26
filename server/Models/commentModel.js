import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postAuthorId:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true,
    },
    commentString:{
        type:String,
        required:true,
    },
    commentLike:{
        type:Map,
        Of:Boolean
    }
},{
    timestamps:true,
})

const commentModel = mongoose.model("Comments",commentSchema);
export default commentModel;