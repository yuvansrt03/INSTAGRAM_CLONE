import React from "react";
import { useNavigate } from "react-router-dom";

function ProfilePosts({ item }) {
  const navigate = useNavigate();
  const handleViewPost = () => {
    navigate(`/posts/${item._id}`);
  };
  return (
    <img
      src={`${process.env.REACT_APP_BACKEND_URL}/assets/${item.postPost}`}
      alt="postPost"
      onClick={handleViewPost}
      className="transition-all ease-in-out rounded-md cursor-pointer duration-350 hover:scale-110 "
    ></img>
  );
}

export default ProfilePosts;
