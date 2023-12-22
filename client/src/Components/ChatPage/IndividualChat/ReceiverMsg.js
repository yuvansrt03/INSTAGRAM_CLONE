import React from "react";

function ReceiverMsg({ lastMessageRef, chatslength, index, msg }) {
  return (
    <div
      className="flex my-3"
      ref={index === chatslength - 1 ? lastMessageRef : null}
    >
      <span className="text-[16px] md:text-[12px] px-2 py-1 bg-gray-300 rounded">
        {msg}
      </span>
    </div>
  );
}

export default ReceiverMsg;
