import React from "react";
import { useState } from "react";
import {
  ChatNavigationMobile,
  HomeNavigationMobile,
  ExploreNavigationMobile,
  CreatePostNavigationMobile,
  SearchNavigationMobile,
} from "../LeftPanelNavigations/LeftPanelNavigationsMobile";
import { useNavigate } from "react-router-dom";
function BottomNav({ path }) {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 flex items-center justify-center w-screen bg-white lg:hidden">
      <div className="flex justify-between items-center w-[200px] h-[50px]">
        <HomeNavigationMobile
          handleSetPath={() => navigate("/")}
          isActive={path === ""}
        />
        <CreatePostNavigationMobile
          handleSetPath={() => navigate("/createPost")}
          isActive={path === "createPost"}
        />
        <ExploreNavigationMobile
          handleSetPath={() => navigate("/explore")}
          isActive={path === "explore"}
        />
        <ChatNavigationMobile
          handleSetPath={() => navigate("/chats")}
          isActive={path === "chats"}
        />
        <SearchNavigationMobile
          handleSetPath={() => navigate("/search")}
          isActive={path === "search"}
        />
      </div>
    </div>
  );
}

export default BottomNav;
