import React, { useState } from 'react';
import './CommentPage.css'; // Import your CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setPost } from '../../Slices/postSlice';
const CommentPage = () => {
    const {postId}=useParams();
    const dispatch=useDispatch();
    const user=useSelector(store=>store.auth.user);
    const posts=useSelector(store=>store.post.posts);
    const feed=posts.find((obj) => obj._id === postId);

  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState(feed.postcomments);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = async(event) => {
    event.preventDefault();
    setCommentsList((item)=>[...item,newComment])
    setComment('');
    const newComment={
      commentAuthorUserName:user.userUserName,
      commentString:comment,
      commentAuthorProfilePic:user.userProfileImg
    }
    const response = await fetch(`http://localhost:5000/posts/comment/${feed._id}`,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(newComment)
    })
    const data=await response.json();
    console.log(data);
    dispatch(setPost(data));

  };

  return (
    <div className="commentPage_container">
      <div className="add_comment_container">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button onClick={handlePostComment}>Post</button>
      </div>
      <div className='font-bold text-gray-800 text-xl mt-2'>Comments</div>
      <div className="mt-3 p-2 ">
        {commentsList.map((comment) => (
          <div className="flex p-2 align-center text-sm border border-t-gray-400 border-b-gray-400 border-l-0 border-r-0" key={comment.id}>
            <img src={`http://localhost:5000/assets/${comment.commentAuthorProfilePic}`} 
            className='h-10 w-10 rounded-full mr-2'
            alt="authorProfilePic" />
            <span className='font-semibold mr-2 pt-2'>{comment.commentAuthorUserName}</span>
            <span className='pt-2'>{comment.commentString}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentPage;
