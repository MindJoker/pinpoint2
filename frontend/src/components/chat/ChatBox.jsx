import React, { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatBox = ({ roomName, token }) => {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const wsUrl = `ws://localhost:9322/ws/chat/${roomName}/?token=${token}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket disconnected:", event.reason);
      setConnected(false);
    };

    // Clean up WebSocket on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [roomName, token]);

  // Send a message through WebSocket
  const sendMessage = (message) => {
    if (ws.current && connected) {
      ws.current.send(
        JSON.stringify({
          message,
        })
      );
    }
  };

  return (
    <div className="chat-box bottom-max  bg-gray-800 p-4 rounded-lg text-gray-100">
      <h2 className="text-xl font-semibold mb-4">Chat Room: {roomName}</h2>
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default ChatBox;
