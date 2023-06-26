import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    postAuthorId:{
        type:String,
        required:true
    },
    postDescription:{
        type:String,
        default:""
    },
    postAuthorName:{
        type:String,
        required:true
    },
    postAuthorProfilePic:{
        type:String,
        default:""
    },
    postPost:{
        type:String,
        required:true
    },
    postLikes:{
        type:Map,
        Of:Boolean,
        default:{}
    },
    postTags:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
})

const postModel=mongoose.model('Post',postSchema);
export default postModel;