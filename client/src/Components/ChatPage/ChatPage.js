import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import LeftPanel from "../LeftPanel/LeftPanel";
import Chats from "./Chats/Chats";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addChatFriends, clearFriends } from "../../Slices/chatSlice";
import BottomNav from "../BottomNav/BottomNav";

function ChatPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  const chatFriends = useSelector((store) => store.chat.chatFriends);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchChatFriends();
  }, []);

  const fetchChatFriends = async () => {
    try {
      const response = await fetch("http://localhost:5000/chats");
      const data = await response.json();
      const userChats = data.filter(
        (item) => item.senderId === user._id || item.receiverId === user._id
      );
      const chatFriends = [];

      userChats.forEach((item) => {
        if (item.senderId === user._id) {
          chatFriends.push(item.receiverId);
        } else {
          chatFriends.push(item.senderId);
        }
      });

      const uniqueChatFriends = [...new Set(chatFriends)].filter(
        (item) => item !== user._id
      );

      dispatch(clearFriends());
      console.log("uniqueChatFriends", uniqueChatFriends);

      const promises = uniqueChatFriends.map(async (item) => {
        const response = await fetch(`http://localhost:5000/users/${item}`);
        const data = await response.json();
        if (data) dispatch(addChatFriends(data));
        return data;
      });

      const result = await Promise.all(promises);

      if (result) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    } catch (error) {
      console.error("Error fetching chat friends:", error);
      setIsLoading(true);
    }
  };

  const handleChat = (friend) => {
    navigate(`/chatPage/${user._id}/${friend._id}`);
  };

  return (
    <>
      <div className="block lg:hidden">
        <img
          className="cursor-pointer left_panel_logo lg:hidden"
          src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex flex-row justify-between w-full ">
        <LeftPanel currentpath={"chats"} />
        <div className="flex flex-col items-center justify-center w-screen mt-4">
          <h1 className="px-[20px] pt-5 text-xl font-extrabold">Chats</h1>
          {isloading ? (
            <div className="w-screen mt-auto loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            chatFriends.map((friend) => (
              <button key={friend._id} onClick={() => handleChat(friend)}>
                <Chats inside={"ChatPage"} friend={friend} />
              </button>
            ))
          )}
        </div>
      </div>
      <BottomNav path={"chats"} />
    </>
  );
}

export default ChatPage;
