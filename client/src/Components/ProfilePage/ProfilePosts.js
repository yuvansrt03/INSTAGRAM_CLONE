import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProfilePosts({item}) {
    const navigate=useNavigate();
    const handleViewPost=()=>{
        navigate(`/posts/${item._id}`);
    }
  return (
    <img src={`http://localhost:5000/assets/${item.postPost}`} alt="postPost" onClick={handleViewPost} className='cursor-pointer'></img>
  )
}

export default ProfilePosts