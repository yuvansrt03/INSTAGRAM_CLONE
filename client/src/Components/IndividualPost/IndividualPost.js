import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Feeds from "../MainPanel/Feeds";
import LeftPanel from "../LeftPanel/LeftPanel";
import BottomNav from "../BottomNav/BottomNav";
function IndividualPost() {
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPost() {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`
          );
          const jsonData = await response.json();
          setFeed(jsonData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      };

      fetchData();
    }
    fetchPost();
  }, []);

  return (
    <>
      {isLoading ? (
        <>Loading</>
      ) : (
        <div className="flex w-screen overflow-y-hidden">
          <div>
            <img
              className="absolute cursor-pointer left_panel_logo lg:hidden"
              src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
              onClick={() => navigate("/")}
            />
          </div>
          <LeftPanel currentpath={"explore"} />
          <BottomNav path={"explore"} />
          <div className="flex items-center h-screen ml-auto mr-auto lg:block lg:m-auto">
            <Feeds feed={feed} />
          </div>
        </div>
      )}
    </>
  );
}

export default IndividualPost;
