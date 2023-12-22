import React, { useEffect, useState, useRef } from "react";
import LeftPanel from "../../LeftPanel/LeftPanel";
import ChatPanel from "../ChatPanel";
import SenderMsg from "./SenderMsg";
import ReceiverMsg from "./ReceiverMsg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { socket } from "../../../socket";
import { useNavigate } from "react-router-dom";
import "../ChatPanel.css";
function IndividualChat() {
  const navigate = useNavigate();
  const { userId, friendId } = useParams();
  const [friend, setFriend] = useState({});
  const [chats, setChats] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    fetchChat();
    socket.connect();
    socket.on("connect", () => {
      console.log("connected to server");
    });
    return () => {
      socket.on("disconnect", () => {
        socket.disconnect();
        console.log("disconnected from server");
      });
    };
  }, [userId, friendId]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);
  socket.on("receive-message", (message) => {
    displayMessage(friendId, userId, message);
  });

  const displayMessage = (sid, rid, message) => {
    const chatData = {
      senderId: sid,
      receiverId: rid,
      chatMessage: message,
    };
    setChats([...chats, chatData]);
  };
  const handleSendMessage = async () => {
    if (chatMessage.trim().length > 0) {
      displayMessage(userId, friendId, chatMessage);
      socket.emit("send-message", chatMessage);
      setChatMessage("");
      const data = await fetch(`http://localhost:5000/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: userId,
          receiverId: friendId,
          chatMessage: chatMessage,
        }),
      });
      const response = await data.json();
    }
  };
  const fetchChat = async () => {
    try {
      const chatResponse = await fetch(
        `http://localhost:5000/chats/${userId}/${friendId}`
      );
      const friendResponse = await fetch(
        `http://localhost:5000/users/${friendId}`
      );
      const friendData = await friendResponse.json();
      const chatData = await chatResponse.json();
      setFriend(friendData);
      setChats(chatData);
      if (Promise.all([friendData, chatData])) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row w-full ">
      <LeftPanel currentpath={"chats"} />
      <ChatPanel />
      <div className="flex-1">
        <div className={`flex flex-col w-screen h-screen lg:w-full`}>
          <div className="flex flex-row p-2 border-0 border-b-2">
            <div
              className="flex flex-1"
              onClick={() => navigate(`/users/${friend._id}`)}
            >
              <img
                className="h-[60px] w-[60px] md:h-[40px] md:w-[40px] object-cover rounded-full"
                src={`http://localhost:5000/assets/${friend.userProfileImg}`}
                alt=""
              />
              <div className="text-[18px] md:text-[16px] flex justify-start items-center ml-2 font-bold">
                {friend.userName}
              </div>
            </div>
            <div
              className=" lg:hidden flex justify-center items-center w-[30px] text-[30px] md:text-[25px] mr-2 cursor-pointer"
              onClick={() => navigate("/chats")}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="ml-auto" />
            </div>
          </div>
          <div className="flex-grow w-full p-2 overflow-y-auto">
            {isLoading ? (
              <div className="w-screen mt-auto loading-container">
                <div className="loading-spinner"></div>
              </div>
            ) : chats.length > 0 ? (
              chats.map((chat, index) => {
                if (chat.senderId === userId) {
                  return (
                    <SenderMsg
                      key={index}
                      index={index}
                      chatslength={chats.length}
                      lastMessageRef={lastMessageRef}
                      msg={chat.chatMessage}
                    />
                  );
                } else {
                  return (
                    <ReceiverMsg
                      key={index}
                      index={index}
                      chatslength={chats.length}
                      lastMessageRef={lastMessageRef}
                      msg={chat.chatMessage}
                    />
                  );
                }
              })
            ) : (
              <div className="flex justify-center items-center h-[400px]">
                No Messages
              </div>
            )}
          </div>
          <div className="flex justify-between px-5 py-3">
            <input
              value={chatMessage}
              className="border-2 rounded text-[16px] md:text-[16px] h-[50px] md:h-auto w-full px-2"
              placeholder="Type Something to Send..."
              type="text"
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button
              className="p-2 px-4 text-[16px] text-white bg-blue-500 rounded md:text-sm"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualChat;
