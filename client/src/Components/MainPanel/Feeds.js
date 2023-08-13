import React, { useState } from 'react'
import './Feeds.css'
import {useSelector,useDispatch} from 'react-redux'
import { UnlikeSVG,ShareSVG,CommentSVG,SaveSVG, LikeSVG } from './svgs';
import { setPost } from '../../Slices/postSlice';
import { useNavigate } from 'react-router-dom';
function Feeds({feed}) {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const user=useSelector(store=>store.auth.user);
  const [liked,setliked]=useState(feed.postLikes[user._id]);
  const [noOfLikes,setNoOfLikes]=useState(Object.keys(feed.postLikes).length);
  const [commentText, setCommentText] = useState('');
  const [noOfComments,setNoOfComments]=useState(Object.keys(feed.postcomments).length);
  
  const handleClickComment=()=>{
    navigate(`/comment/${feed._id}`);
  }

  const handleViewUser=()=>{
    navigate(`/users/${feed.postAuthorId}`);
  }
  const handleLike=async()=>{
    try{
      setliked(like=>!like);
      if(liked)setNoOfLikes(count=>count-=1);
      else setNoOfLikes(count=>count+=1);
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
  
  const handleComment = async(event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/posts/comment/${feed._id}`,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        commentAuthorUserName:user.userUserName,
        commentString:commentText,
      })
    })
    const data=await response.json();
    dispatch(setPost(data));
    setCommentText('');
  };
  
  return (
    <div className="border rounded-sm shadow-lg main_panel_feed ">
      <div className="main_panel_feed_header"> 
        <img className="main_panel_feed_profile_img cursor-pointer" onClick={handleViewUser} src={`http://localhost:5000/assets/${feed.postAuthorProfilePic}`} alt="" />
        <div className='ml-1 font-semibold feed_authorName cursor-pointer' onClick={handleViewUser} >{feed.postAuthorName}</div>
      </div>
      
      <img className='main_panel_feed_file' src={`http://localhost:5000/assets/${feed.postPost}`} alt="" />
      <div className='main_panel_feed_description'>
        <div className='mx-2 font-bold'>{feed.postAuthorName}</div>
        {feed.postDescription}
      </div>
      <div className="main_panel_feed_footer">
        <div className='flex flex-row flex-1 align-center'>
          <button onClick={handleLike}>{liked?<LikeSVG/>:<UnlikeSVG/>}</button>
          <button onClick={handleClickComment}><CommentSVG/></button>
          <button><ShareSVG/></button>
        </div>
        <button><SaveSVG/></button>
      </div>
      {noOfLikes>0?<div className='font-semibold text-sm bg-white ml-2 pb-1'>{noOfLikes} Likes</div>:<></>}
      {noOfComments>0?<div className='w-full bg-white'><button className='font-semibold text-gray-500 text-sm bg-white ml-2' onClick={handleClickComment}> View all {noOfComments} comments</button></div>:<></>}
      <div className="p-1 bg-white border-gray-300 text-sm">
        <form onSubmit={handleComment}>
          <div className="flex items-center">
            <input
              type="text"
              value={commentText}
              onChange={(e)=>setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow ml-2 focus:outline-none"
            />
            <button
              type="submit"
              className="px-2 py-1 font-semibold text-blue-500 rounded-xl hover:text-blue-600 focus:outline-none"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Feeds