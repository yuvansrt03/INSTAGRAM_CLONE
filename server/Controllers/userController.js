import  userModel  from '../Models/usermodel.js';

export const updateUser = async(req,res)=>{
    try {
        const userId=req.params.id;
        let body=req.body;
        if(req.file){
            const filename=req.file.originalname.replace(/\s/g, "");
            body={...req.body,userProfileImg:filename};
        }
        await userModel.findByIdAndUpdate(userId,body);
        const updateduser = await userModel.findById(userId);
        res.status(200).json(updateduser);

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export const friendUser = async(req,res)=>{
    try {
        const userId=req.params.id;
        const friendId=req.params.friendId;

        const user = await userModel.findById(userId);
        let userFriends=user.userFriends;
        if(userFriends.includes(friendId) && userFriends!=null){
            userFriends=userFriends.filter(item=>item!=friendId);
        }
        else{
            userFriends.push(friendId);
        }
        await userModel.findByIdAndUpdate(userId,{userFriends:userFriends});
        const updatedUser = await userModel.findById(userId);
        res.status(200).json(updatedUser);

    } catch (error) {
        
    }
}

export const getUser=async(req,res)=>{
    try {
        const user=await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export const followId = async(req,res)=>{
    try {
        const userId=req.params.id;
        const friendId=req.params.friendId;

        const user=await userModel.findById(userId);
        const friend=await userModel.findById(friendId);

        let userFollowing=user.userFollowing;
        let friendFollowers=friend.userFollowers;

        if(userFollowing.includes(friendId) && userFollowing!=null){
            userFollowing=userFollowing.filter(item=>item!=friendId);
            friendFollowers=friendFollowers.filter(item=>item!=userId);
        }
        else{
            userFollowing.push(friendId);
            friendFollowers.push(userId);
        }

        await userModel.findByIdAndUpdate(userId,{userFollowing:userFollowing})
        await userModel.findByIdAndUpdate(friendId,{userFollowers:friendFollowers});

        const updateduser=await userModel.findById(userId);
        res.status(200).json(updateduser);
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}