import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-input mt-4 flex">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 p-2 rounded-l-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
