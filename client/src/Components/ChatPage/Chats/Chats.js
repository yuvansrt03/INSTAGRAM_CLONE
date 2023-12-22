import React from "react";
function Chats({ friend, inside }) {
  return (
    <div
      className={
        inside == "ChatPage"
          ? "w-[400px] md:w-[550px] lg:w-[500px] flex flex-row items-center border-0 border-b-2 p-3"
          : "w-[300px] h-[70px] flex flex-row items-center border-0 border-b-2 pl-3"
      }
    >
      <img
        className={
          inside == "ChatPage"
            ? "h-[65px] w-[65px] md:h-[70px] md:w-[70px] lg:h-[50px] lg:w-[50px] rounded-full object-cover"
            : "h-[45px] w-[45px] rounded-full object-cover"
        }
        src={`http://localhost:5000/assets/${friend.userProfileImg}`}
        alt=""
      />
      <div className="flex flex-col p-2 ml-2">
        <div className="flex font-bold text-md">
          <span className="text-[16px] lg:text-[14px]text-left">
            {friend.userUserName}
          </span>
        </div>
        <div className="text-[14px] lg:text-[11px] flex justify-start">
          {friend.userName}
        </div>
      </div>
    </div>
  );
}

export default Chats;
