import React, { useEffect, useState } from "react";
import LeftPanel from "../LeftPanel/LeftPanel";
import RightPanel from "../RightPanel/RightPanel";
import ProfilePosts from "../ProfilePage/ProfilePosts";
import BottomNav from "../BottomNav/BottomNav";
import { useNavigate } from "react-router-dom";
import "./ExplorePanel.css";
import ForYou from "./ForYou";
function ExplorePanel() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`http://localhost:5000/posts`);
        const data = await response.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.log({ error: error.message });
        setIsLoading(false);
      }
    }
    fetchPosts();
  });
  return (
    <>
      <div className="flex flex-row explore_panel">
        <LeftPanel currentpath={"explore"} inBottom={false} />
        {isLoading ? (
          <div className="w-screen mt-auto loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="w-[100vw] lg:ml-[250px]">
            <img
              className="cursor-pointer left_panel_logo lg:hidden"
              src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
              onClick={() => navigate("/")}
            />

            <ForYou posts={posts} />
          </div>
        )}
      </div>
      <BottomNav path={"explore"} />
    </>
  );
}

export default ExplorePanel;
