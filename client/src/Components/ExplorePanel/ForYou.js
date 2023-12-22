import React from "react";
import ProfilePosts from "../ProfilePage/ProfilePosts";
function ForYou({ posts }) {
  return (
    <>
      <h1 className="px-[20px] pt-5 text-xl font-extrabold">For You</h1>
      <div className="flex flex-1 explore_container">
        {posts.map((item) => (
          <ProfilePosts item={item} />
        ))}
      </div>
    </>
  );
}

export default ForYou;
