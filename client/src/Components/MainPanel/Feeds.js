import React, { useState } from "react";
import "./Feeds.css";
import { useSelector, useDispatch } from "react-redux";
import { UnlikeSVG, ShareSVG, CommentSVG, SaveSVG, LikeSVG } from "./svgs";
import { setPost, setPosts } from "../../Slices/postSlice";
import { useNavigate } from "react-router-dom";
function Feeds({ feed, updatefeed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const [liked, setliked] = useState(feed.postLikes[user._id]);
  const [noOfLikes, setNoOfLikes] = useState(
    Object.keys(feed.postLikes).length
  );
  const [commentText, setCommentText] = useState("");
  const handleClickComment = () => {
    navigate(`/comment/${feed._id}`);
  };

  const handleViewUser = () => {
    navigate(`/users/${feed.postAuthorId}`);
  };

  const handleLike = async () => {
    try {
      setliked((like) => !like);
      if (liked) setNoOfLikes((count) => (count -= 1));
      else setNoOfLikes((count) => (count += 1));
      const response = await fetch(
        `http://localhost:5000/posts/${feed._id}/${user._id}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      dispatch(setPost(data));
    } catch (error) {
      console.log({ error: error });
    }
  };
  const handleDeletePost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${feed._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      dispatch(setPosts(sortedData));
      updatefeed(sortedData);
    } catch (error) {
      console.log({ error: error.message });
    }
  };
  const handleComment = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/comments/${feed._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentPostId: feed._id,
        commentAuthorUserName: user.userUserName,
        commentString: commentText,
        commentAuthorProfilePic: user.userProfileImg,
      }),
    });
    const data = await response.json();
    dispatch(setPost(data));
    setCommentText("");
  };

  return (
    <div className="border rounded-sm shadow-lg main_panel_feed ">
      <div className="main_panel_feed_header">
        <img
          className="cursor-pointer main_panel_feed_profile_img"
          onClick={handleViewUser}
          src={`http://localhost:5000/assets/${feed.postAuthorProfilePic}`}
          alt=""
        />
        <div
          className="flex-1 ml-1 font-semibold cursor-pointer text-[12px] lg:text-[14px]"
          onClick={handleViewUser}
        >
          {feed.postAuthorName}
        </div>
        {feed.postAuthorId === user._id ? (
          <button
            className="mr-3 text-red-500 text-[12px] lg:text-[14px]"
            onClick={handleDeletePost}
          >
            Delete
          </button>
        ) : (
          <></>
        )}
      </div>
      <img
        className="main_panel_feed_file"
        src={`http://localhost:5000/assets/${feed.postPost}`}
        alt=""
      />
      <div className="main_panel_feed_description">
        <div className="mx-2 font-bold text-[12px] lg:text-[14px]">
          {feed.postAuthorName}
        </div>
        <span className="text-[12px] lg:text-[14px]">
          {feed.postDescription}
        </span>
      </div>
      <div className="main_panel_feed_footer">
        <div className="flex flex-row flex-1 align-center ">
          <button onClick={handleLike}>
            {liked ? <LikeSVG /> : <UnlikeSVG />}
          </button>
          <button onClick={handleClickComment}>
            <CommentSVG />
          </button>
          <button>
            <ShareSVG />
          </button>
        </div>
        <button>
          <SaveSVG />
        </button>
      </div>
      {noOfLikes > 0 ? (
        <div className="pb-1 ml-2 text-sm font-semibold bg-white text-[12px] lg:text-[14px]">
          {noOfLikes} Likes
        </div>
      ) : (
        <></>
      )}
      <div className="w-full bg-white">
        <button
          className="ml-2 text-sm font-semibold text-gray-500 bg-white text-[12px] lg:text-[14px]"
          onClick={handleClickComment}
        >
          View all comments
        </button>
      </div>
      <div className="p-1 text-sm bg-white border-gray-300">
        <form onSubmit={handleComment}>
          <div className="flex items-center">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow ml-2 focus:outline-none text-[12px] lg:text-[14px]"
            />
            <button
              type="submit"
              className="px-2 py-1 font-semibold text-blue-500 rounded-xl hover:text-blue-600 focus:outline-none text-[12px] lg:text-[14px]"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Feeds;
