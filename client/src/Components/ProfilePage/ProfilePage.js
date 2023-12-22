import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { setUser } from "../../Slices/authSlice";
import LeftPanel from "../LeftPanel/LeftPanel";
import ProfilePosts from "./ProfilePosts";
import BottomNav from "../BottomNav/BottomNav";
import Loader from "../Loader.js";
import { addChatFriends } from "../../Slices/chatSlice.js";
function ProfilePage() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [isadmin, setIsadmin] = useState(user._id === userId);
  const [userData, setUserData] = useState([]);
  const [userPosts, setUserPosts] = useState({});
  const [isFollowing, setIsFollowing] = useState(
    user.userFollowing.includes(userId)
  );
  const [followuser, setFollowUser] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [ispostsLoading, setIspostsLoading] = useState(true);
  useEffect(() => {
    fetchData();
    fetchPosts();
  }, []);
  const fetchData = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`);
    const data = await response.json();
    setUserData(data);
    setIsLoading(false);
    setFollowUser(data.userFollowers.length);
  };
  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    const userPost = data.filter((item) => item.postAuthorId === userId);
    setUserPosts(userPost);
    setIspostsLoading(false);
  };
  const handleFollowId = async () => {
    try {
      setIsFollowing((value) => !value);
      isFollowing
        ? setFollowUser((value) => (value = value - 1))
        : setFollowUser((value) => (value = value + 1));
      const response = await fetch(
        `http://localhost:5000/users/follow/${user._id}/${userId}`,
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
  const handleClickMessage = () => {
    dispatch(addChatFriends(userData));
    navigate(`/chatPage/${user._id}/${userId}`);
  };
  return (
    <>
      <div className="flex">
        <div className="hidden lg:block w-[250px]">
          <LeftPanel currentpath={"explore"} />
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-[400px]">
              <img
                className="cursor-pointer h-[40px]  lg:hidden"
                src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="flex items-center justify-center w-screen ml-0 lg:ml-20">
              <div className="flex flex-col items-center">
                <div className="flex justify-center">
                  <div className="profile_header">
                    <img
                      src={`http://localhost:5000/assets/${userData.userProfileImg}`}
                      className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] object-cover rounded-full"
                      alt="Profile"
                    />
                    <div className="profile_details lg:mr-[100px]">
                      <>
                        <h2 className="font-semibold text:sm lg:text-lg">
                          {userData.userUserName}
                        </h2>
                        <h2 className="flex-1 text-xs font-semibold text-gray-500 lg:text-sm">
                          {userData.userName}
                        </h2>
                      </>
                      <div className="flex justify-between">
                        <p className="py-1 mr-2 text-sm font-bold">
                          <span className="text:sm lg:text-lg font-extraboldbold">
                            {followuser}
                          </span>{" "}
                          Followers
                        </p>
                        <p className="py-1 mr-2 text-sm font-bold">
                          <span className="text:sm lg:text-lg font-extraboldbold">
                            {userData.userFollowing.length}
                          </span>{" "}
                          Following
                        </p>
                        <p className="py-1 mr-2 text-sm font-bold">
                          <span className="text:sm lg:text-lg font-extraboldbold">
                            {Object.keys(userPosts).length}
                          </span>{" "}
                          Posts
                        </p>
                      </div>
                      <div className="flex justify-between">
                        {!isadmin ? (
                          <button
                            className="p-1 text-sm w-[120px] lg:w-[130px] rounded profile_follow_button"
                            onClick={handleFollowId}
                          >
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
                                  style={{ color: "#ffffff" }}
                                  className="mr-1"
                                />
                                Follow
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            className="hidden p-1 text-sm rounded profile_follow_button"
                            onClick={handleFollowId}
                          ></button>
                        )}
                        {isadmin ? null : (
                          <button
                            className="p-1 text-sm bg-gray-300 w-[120px] lg:w-[130px] rounded-sm"
                            onClick={handleClickMessage}
                          >
                            Message
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[400px] lg:w-[700px] my-5">
                  <span className="font-semibold ">POSTS</span>
                  {ispostsLoading ? (
                    <Loader />
                  ) : (
                    <div className="flex flex-wrap justify-between gap-4 mt-5 posts_container">
                      {userPosts.length > 0 ? (
                        userPosts.map((item) => (
                          <ProfilePosts item={item}></ProfilePosts>
                        ))
                      ) : (
                        <div className="w-full font-bold text-center">
                          No Posts
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="">
        <BottomNav path="explore" />
      </div>
    </>
  );
}

export default ProfilePage;
