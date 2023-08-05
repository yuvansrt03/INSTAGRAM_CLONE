import React, { useState } from 'react'
import './Feeds.css'
import {useSelector,useDispatch} from 'react-redux'
import { UnlikeSVG,ShareSVG,CommentSVG,SaveSVG, LikeSVG } from './svgs';
import { setPost } from '../../Slices/postSlice';
function Feeds({feed}) {
  const dispatch=useDispatch();
  const user=useSelector(store=>store.auth.user);
  console.log('asdfa')
  const [liked,setliked]=useState(feed.postLikes[user._id]);
  const handleLike=async()=>{
    try{
      setliked(like=>!like);
      const response=await fetch(`http://localhost:5000/posts/${feed._id}/${user._id}`,{
        method:'PUT'
      });
      const data=await response.json();
      dispatch(setPost(data));
    }
    catch(error){
      console.log({error:error})
    }
  }
  return (
    <div className="main_panel_feed shadow-lg border rounded-sm ">
      <div className="main_panel_feed_header"> 
        <img className="main_panel_feed_profile_img"src={`http://localhost:5000/assets/${feed.postAuthorProfilePic}`} alt="" />
        <div>{feed.postAuthorName}</div>
      </div>
      
      <img className='main_panel_feed_file' src={`http://localhost:5000/assets/${feed.postPost}`} alt="" />
      <div className='main_panel_feed_description'>
        <div className='font-bold mx-2'>{feed.postAuthorName}</div>
        {feed.postDescription}
      </div>
      <div className="main_panel_feed_footer">
        <div className='flex flex-row flex-1 align-center'>
          <button onClick={handleLike}>{liked?<LikeSVG/>:<UnlikeSVG/>}</button>
          <button><CommentSVG/></button>
          <button><ShareSVG/></button>
        </div>
        <button><SaveSVG/></button>
         </div>
    </div>
  )
}

export default Feeds