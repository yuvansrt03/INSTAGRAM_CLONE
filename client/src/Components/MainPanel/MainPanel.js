import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import Feeds from "./Feeds";
import Stories from "./Stories";
import "./MainPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../Slices/postSlice";
import UserProfile from "../UserProfile/UserProfile";
import HeaderMobile from "./HeaderMobile";
function MainPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(true);
  const postData = useSelector((store) => store.post.posts);
  const user = useSelector((store) => store.auth.user);
  const [feeds, setFeeds] = useState(postData);
  useEffect(() => {
    fetchData();
  }, []);
  const updatefeed = (feed) => {
    setFeeds(feed);
  };
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts");
      const jsonData = await response.json();
      const sortedData = jsonData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      // console.log(sortedData)
      dispatch(setPosts(sortedData));
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsloading(false);
    }
  };
  return (
    <section className="flex flex-col items-center justify-center w-screen ">
      <HeaderMobile />
      <div className="w-[400px] lg:w-[600px] ">
        {isloading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div>
            {feeds.map((feed) => (
              <Feeds key={feed._id} feed={feed} updatefeed={updatefeed}></Feeds>
            ))}
            <div className="block h-[40px] lg:hidden"></div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MainPanel;
