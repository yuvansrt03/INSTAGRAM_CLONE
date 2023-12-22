import React from "react";

function SenderMsg({ lastMessageRef, chatslength, index, msg }) {
  return (
    <div
      className="text-[16px] md:text-[12px] flex justify-end my-3"
      ref={index === chatslength - 1 ? lastMessageRef : null}
    >
      <span className="px-2 py-1 text-white bg-blue-400 rounded">{msg}</span>
    </div>
  );
}

export default SenderMsg;
