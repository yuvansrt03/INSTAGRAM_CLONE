import React,{useState} from 'react'
import './UserProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {setLogout,setUser} from '../../Slices/authSlice'
function UserProfile({friend,isadmin}) {
  const dispatch=useDispatch()
  const user=useSelector(store=>store.auth.user);
  const [isFollowing,setIsFollowing]=useState(user.userFollowing.includes(friend._id));
  const handleSignout=()=>{
    dispatch(setLogout());
  }
  const handleFollowId=async()=>{
    try{
      setIsFollowing(value=>!value);
      const response=await fetch(`http://localhost:5000/users/follow/${user._id}/${friend._id}`,{
        method:'PUT',
        header:{'Content-Type': 'application/json',},
      });
      const data=await response.json();
      dispatch(setUser(data));
    }catch(error){
      console.log({error:error.message})
    }
  }
  return (
    <div className="userProfile_container">
        <img className="userProfile_image" src={`http://localhost:5000/assets/${friend.userProfileImg}`} alt="" />
        <div className='flex flex-col justify-center flex-1'>
          <div className='ml-4 userProfile_userName'>{friend.userUserName}</div>
          <div className='ml-4 userProfile_Name '>{friend.userName}</div>
        </div>
        {!isadmin?
        <button className="follow-button" onClick={handleFollowId}>
          {isFollowing ? <>
          <FontAwesomeIcon icon={faMinus} style={{color: "#BFBFBF",}} className='mr-1'/>
          Unfollow
          </>:<>
          <FontAwesomeIcon icon={faPlus} style={{color: "#3897f0",}} className='mr-1'/>
          Follow
          </>}
        </button>:
        <>
          <button className="logout-button" onClick={handleSignout}>
            <FontAwesomeIcon icon={faSignOutAlt} className='mr-1'/>Logout
          </button>
        </>
        }
    </div>
  )
}

export default UserProfile