import React from "react";

const MessageList = ({ messages }) => {
  return (
    <div className="message-list h-64 overflow-y-auto bg-gray-700 p-4 rounded-lg">
      {messages.length === 0 ? (
        <p className="text-gray-400">No messages yet</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="message mb-2">
            <span className="font-bold">{msg.sender || "Anonymous"}: </span>
            <span>{msg.message}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
