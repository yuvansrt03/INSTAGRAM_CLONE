import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCompass,
  faInbox,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
export const HomeNavigation = ({ handleSetPath, isActive }) => {
  const navigate = useNavigate();
  const spanClass = classnames("text-sm font-bold", {
    isactivecolor: isActive,
    "text-black": !isActive,
  });
  const iconClass = classnames("pr-3 text-lg pl-7", {
    isactivecolor: isActive,
    "text-black": !isActive,
  });
  const divClass = classnames("bg-gray-500", {
    isactivebar: isActive,
    isunactivebar: !isActive,
  });
  const handleClick = () => {
    handleSetPath("home");
    navigate("/");
  };
  return (
    <button
      className="left_panel_screen_type"
      onClick={() => handleSetPath("")}
    >
      <div className={divClass}></div>
      <FontAwesomeIcon icon={faHouse} className={iconClass} />
      <span className={spanClass}>Feed</span>
    </button>
  );
};
export const ExploreNavigation = ({ handleSetPath, isActive }) => {
  const spanClass = classnames("text-sm font-bold", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const iconClass = classnames("pr-3 text-lg pl-7", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const divClass = classnames("bg-black", {
    isactivebar: isActive,
    isunactivebar: !isActive,
  });
  return (
    <button
      className="left_panel_screen_type"
      onClick={() => handleSetPath("explore")}
    >
      <div className={divClass}></div>
      <FontAwesomeIcon icon={faCompass} className={iconClass} />
      <span className={spanClass}>Explore</span>
    </button>
  );
};
export const ChatNavigation = ({ handleSetPath, isActive }) => {
  const spanClass = classnames("text-sm font-bold", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const iconClass = classnames("pr-3 text-lg pl-7", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const divClass = classnames("bg-black", {
    isactivebar: isActive,
    isunactivebar: !isActive,
  });
  return (
    <button
      className="left_panel_screen_type"
      onClick={() => handleSetPath("chats")}
    >
      <div className={divClass}></div>
      <FontAwesomeIcon icon={faInbox} className={iconClass} />
      <span className={spanClass}>Chats</span>
    </button>
  );
};

export const CreatePostNavigation = ({ handleSetPath, isActive }) => {
  const spanClass = classnames("text-sm font-bold", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const iconClass = classnames("pr-3 text-lg pl-7", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const divClass = classnames("bg-black", {
    isactivebar: isActive,
    isunactivebar: !isActive,
  });
  return (
    <button
      className="left_panel_screen_type"
      onClick={() => handleSetPath("createPost")}
    >
      <div className={divClass}></div>
      <FontAwesomeIcon icon={faPlus} className={iconClass} />
      <span className={spanClass}>CreatePost</span>
    </button>
  );
};

export const SearchNavigation = ({ handleSetPath, isActive }) => {
  const spanClass = classnames("text-sm font-bold", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const iconClass = classnames("pr-3 text-lg pl-7", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const divClass = classnames("bg-black", {
    isactivebar: isActive,
    isunactivebar: !isActive,
  });
  return (
    <button
      className="left_panel_screen_type"
      onClick={() => handleSetPath("search")}
    >
      <div className={divClass}></div>
      <FontAwesomeIcon icon={faSearch} className={iconClass} />
      <span className={spanClass}>Users</span>
    </button>
  );
};
