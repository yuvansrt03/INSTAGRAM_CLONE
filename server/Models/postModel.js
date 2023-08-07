import mongoose from 'mongoose';
// import {commentSchema} from './commentModel';
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
    },
    postcomments:[
        {
            commentAuthorUserName:{
                type:String,
                required:true,
            },
            commentString:{
                type:String,
                required:true,
            },
            commentLike:{
                type:Map,
                Of:Boolean,
                default:[]
            }
        }
    ],
},{
    timestamps:true
})

const postModel=mongoose.model('Post',postSchema);
export default postModel;