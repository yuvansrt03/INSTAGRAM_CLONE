import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { setUser } from '../../Slices/authSlice';
import LeftPanel from '../LeftPanel/LeftPanel'

function ProfilePage() {
    const user=useSelector(store=>store.auth.user);
    const dispatch=useDispatch();
    const {userId}=useParams();
    const [userData,setUserData]=useState([]);
    const [userPosts,setUserPosts]=useState({});
    const [isFollowing,setIsFollowing]=useState(user.userFollowing.includes(userId));
    const [followuser,setFollowUser]=useState(0);
    const [isLoading,setIsLoading]=useState(true);
    const [ispostsLoading,setIspostsLoading]=useState(true);
    useEffect(()=>{
        fetchData();
        fetchPosts();
    },[]);
    const fetchData=async()=>{
        const response= await fetch(`http://localhost:5000/users/${userId}`);
        const data=await response.json();
        setUserData(data);
        setIsLoading(false);
        setFollowUser(data.userFollowers.length);
    }
    const fetchPosts=async()=>{
        const response=await fetch('http://localhost:5000/posts');
        const data=await response.json();
        const userPost=data.filter(item=>item.postAuthorId===userId)
        setUserPosts(userPost);
        console.log(userPost);
        setIspostsLoading(false);
    }
    const handleFollowId=async()=>{
        try{
          setIsFollowing(value=>!value);
          isFollowing?setFollowUser(value=>value=value-1):setFollowUser(value=>value=value+1);
          const response=await fetch(`http://localhost:5000/users/follow/${user._id}/${userId}`,{
            method:'PUT',
            header:{'Content-Type': 'application/json',},
          });
          const data=await response.json();
          dispatch(setUser(data));
        }catch(error){
          console.log({error:error.message})
        }
      }
    const handleViewPost=async()=>{

    }
    return (
        <>
            {isLoading?<>
            loading
            </>:
            <div className='flex'>
        <div className='w-[250px]'><LeftPanel/></div>
        <div className="profile-container ml-20 ">
            <div className='flex flex-col items-center'>
                <div className='flex justify-center'>
                    <div className='profile_header'>
                        <img src={`http://localhost:5000/assets/${userData.userProfileImg}`} className="profile_display_picture" alt="Profile" />
                        <div className="profile_details">
                            <h2 className='font-semibold text-lg flex-1'>{userData.userUserName}</h2>
                            <h2 className='font-semibold text-sm flex-1'>{userData.userUserName}</h2>
                            <div className='flex justify-between'>
                                <p className='text-sm font-bold py-1 mr-2'><span className='font-extraboldbold text-lg'>{followuser}</span> Followers</p>
                                <p className='text-sm font-bold py-1 mr-2'><span className='font-extraboldbold text-lg'>{userData.userFollowing.length}</span> Following</p>
                                <p className='text-sm font-bold py-1 mr-2'><span className='font-extraboldbold text-lg'>{Object.keys(userPosts).length}</span> Posts</p>
                            </div>
                            <button className="profile_follow_button rounded text-sm p-1" onClick={handleFollowId}>
                                {isFollowing ? 
                                    <>
                                        <FontAwesomeIcon icon={faMinus} style={{color: "#BFBFBF",}} className='mr-1'/>
                                        Unfollow
                                    </>:
                                    <>
                                        <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} className='mr-1'/>
                                        Follow
                                    </>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-[600px] my-5'>
                    <span className='font-semibold '>POSTS</span>
                    {ispostsLoading?<>Loading</>:
                        <div className='posts_container mt-5'>
                            {userPosts.map(item=><img src={`http://localhost:5000/assets/${item.postPost}`} alt="postPost" className='' onClick={handleViewPost}></img>)}
                        </div>
                    }
                </div>
            </div>
        </div>
        </div>
        }
    </>
    );
}

export default ProfilePage