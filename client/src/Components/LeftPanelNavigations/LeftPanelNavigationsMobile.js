import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCompass,
  faInbox,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
export const HomeNavigationMobile = ({ handleSetPath, isActive }) => {
  const iconClass = classnames("px-3", {
    isactivecolor: isActive,
    "text-black": !isActive,
  });
  const divClass = classnames("absolute bottom-0 w-full h-[3px]", {
    isactivebar: isActive,
    isunactivebar: !isActive,
  });
  return (
    <button
      className="relative left_panel_screen_type_mobile"
      onClick={() => handleSetPath("")}
    >
      <FontAwesomeIcon icon={faHouse} className={iconClass} />
      <div className={divClass}></div>
    </button>
  );
};
export const ExploreNavigationMobile = ({ handleSetPath, isActive }) => {
  const iconClass = classnames("px-3", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const divClass = classnames("absolute bottom-0 w-full h-[3px]", {
    isactivebar: isActive,
    isunactivebar: !isActive,
  });
  return (
    <button
      className="relative left_panel_screen_type_mobile"
      onClick={() => handleSetPath("explore")}
    >
      <FontAwesomeIcon icon={faCompass} className={iconClass} />
      <div className={divClass}></div>
    </button>
  );
};
export const ChatNavigationMobile = ({ handleSetPath, isActive }) => {
  const iconClass = classnames("px-3", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const divClass = classnames("absolute bottom-0 w-full h-[3px] ", {
    isactivebar: isActive,
    isunactivebar: !isActive,
  });
  return (
    <button
      className="relative left_panel_screen_type_mobile"
      onClick={() => handleSetPath("chats")}
    >
      <FontAwesomeIcon icon={faInbox} className={iconClass} />
      <div className={divClass}></div>
    </button>
  );
};

export const CreatePostNavigationMobile = ({ handleSetPath, isActive }) => {
  const iconClass = classnames("px-3", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const divClass = classnames("absolute bottom-0 w-full h-[3px] ", {
    isactivebar: isActive,
    isunactivebar: !isActive,
  });
  return (
    <button
      className="relative left_panel_screen_type_mobile"
      onClick={() => handleSetPath("createPost")}
    >
      <FontAwesomeIcon icon={faPlus} className={iconClass} />
      <div className={divClass}></div>
    </button>
  );
};

export const SearchNavigationMobile = ({ handleSetPath, isActive }) => {
  const iconClass = classnames("px-3", {
    isactivecolor: isActive,
    "text-gray-600": !isActive,
  });
  const divClass = classnames("absolute bottom-0 w-full h-[3px] ", {
    isactivebar: isActive,
    isunactivebar: !isActive,
  });
  return (
    <button
      className="relative left_panel_screen_type_mobile"
      onClick={() => handleSetPath("search")}
    >
      <FontAwesomeIcon icon={faSearch} className={iconClass} />
      <div className={divClass}></div>
    </button>
  );
};
