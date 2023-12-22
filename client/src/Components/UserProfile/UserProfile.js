import React, { useState } from "react";
import "./UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUser } from "../../Slices/authSlice";
import { useNavigate } from "react-router-dom";
function UserProfile({ friend, isadmin, inSearch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const [isFollowing, setIsFollowing] = useState(
    user.userFollowing.includes(friend._id)
  );
  const handleSignout = () => {
    dispatch(setLogout());
  };
  const handleFollowId = async () => {
    try {
      setIsFollowing((value) => !value);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/follow/${user._id}/${friend._id}`,
        {
          method: "PUT",
          header: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      dispatch(setUser(data));
    } catch (error) {
      console.log({ error: error.message });
    }
  };
  const handleViewUser = () => {
    navigate(`/users/${friend._id}`);
  };
  return (
    <div className="userProfile_container">
      <img
        className="userProfile_image"
        src={`${process.env.REACT_APP_BACKEND_URL}/assets/${friend.userProfileImg}`}
        onClick={handleViewUser}
        alt=""
      />
      <div
        className="flex flex-col justify-center flex-1 cursor-pointer"
        onClick={handleViewUser}
      >
        <div className="ml-4 userProfile_userName">{friend.userUserName}</div>
        <div className="ml-4 userProfile_Name ">{friend.userName}</div>
      </div>
      {!inSearch ? (
        <>
          {!isadmin ? (
            <button className="follow-button" onClick={handleFollowId}>
              {isFollowing ? (
                <>
                  <FontAwesomeIcon
                    icon={faMinus}
                    style={{ color: "#BFBFBF" }}
                    className="mr-1"
                  />
                  Unfollow
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#3897f0" }}
                    className="mr-1"
                  />
                  Follow
                </>
              )}
            </button>
          ) : (
            <>
              <button className="logout-button" onClick={handleSignout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                Logout
              </button>
            </>
          )}
        </>
      ) : null}
    </div>
  );
}

export default UserProfile;
