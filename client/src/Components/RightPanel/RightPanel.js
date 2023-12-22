import React, { useEffect, useState } from "react";
import "./RightPanel.css";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
function RightPanel() {
  const user = useSelector((store) => store.auth.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        const jsonData = await response.json();
        const friendJson = jsonData.filter((item) => item._id !== user._id);
        setData(friendJson);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="hidden right_panel_container lg:block">
      <div className="right_panel_user_profile">
        <UserProfile friend={user} isadmin={true}></UserProfile>
      </div>
      <div>
        <p className="mt-5 font-bold">Suggested for You</p>
      </div>
      <div className="right_panel_suggested">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data.map((item) => (
              <UserProfile key={item._id} friend={item} isadmin={false} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default RightPanel;
