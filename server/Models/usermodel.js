import mongoose from "mongoose";

const user=new mongoose.Schema({
    userUserName:{
        type:String,
        unique:true,
        required:true
    },
    userName:{
        type:String,
    },
    userPassword:{
        type:String,
        required:true
    },
    userDOB:{
        type:Date,
        required:true
    },
    userFriends:{
        type:Array,
        default:[]
    },
    userProfileImg:{
        type:String,
        default:''
    },
    userEmail:{
        type:String,
        default:''
    },
    userFollowers:{
        type:Array,
        default:[]
    },
    userFollowing:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
})

const userModel = mongoose.model('User',user);
export default userModel;