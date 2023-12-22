import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProfile from "../UserProfile/UserProfile";
function HeaderMobile() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  const handleLogoClick = () => {
    window.location.reload();
  };
  return (
    <div className="flex items-center justify-center w-screen lg:hidden">
      <div className="flex-1">
        <img
          className="cursor-pointer left_panel_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
          onClick={handleLogoClick}
        />
      </div>
      <div className="w-[200px] cursor-pointer">
        <UserProfile friend={user} isadmin={true} />
      </div>
    </div>
  );
}

export default HeaderMobile;
