import React from "react";
import Chats from "./Chats/Chats";
import "./ChatPanel.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function ChatPanel() {
  var friend = useSelector((store) => store.chat.chatFriends);
  const user = useSelector((store) => store.auth.user);
  friend = friend.filter((friend) => friend._id !== user._id);
  const navigate = useNavigate();
  const handleClick = (friend) => {
    navigate(`/chatPage/${user._id}/${friend._id}`);
  };
  return (
    <div className="hidden lg:flex flex-row items-start justify-between w-[300px] ml-[252px] h-screen overflow-y-scroll overflow-x-hidden border-0 border-r-2">
      <div className="flex flex-col items-center justify-center w-screen mt-4">
        <div className="font-bold">Chats</div>
        {friend == null ? (
          <>No Chats</>
        ) : (
          friend.map((friend) => (
            <button onClick={() => handleClick(friend)}>
              <Chats inside={"ChatPanel"} friend={friend} />
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default ChatPanel;
