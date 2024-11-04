import { useState, useEffect, useContext } from "react";
import { getRequest } from "../../features/chatFeature/chatActions";
import { ChatContext } from "../../components/context/chatContext";
import backendURL from "../../config";

function useFetchLatestMessage(chat, newMessage, notifications) {
  const { currentChat, socket } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      if (!chat?._id) {
        console.warn("Chat ID is not defined");
        return;
      }

      try {
        const response = await getRequest(
          `${backendURL}/api/messages/${chat._id}`
        );

        console.log("API Response:", response);

        if (!response || !response.data || !Array.isArray(response.data)) {
          console.warn("Unexpected response format", response);
          return;
        }

        if (response.data.length === 0) {
          console.log("No messages found");
          setLatestMessage(null);
          return;
        }

        const lastMessage = response.data[response.data.length - 1];
        console.log("Latest Message from API:", lastMessage);
        setLatestMessage(lastMessage);
      } catch (error) {
        console.error("Failed to fetch the latest message:", error);
      }
    };

    getMessages();
  }, [newMessage, notifications, chat]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message) => {
      if (currentChat?._id === message.chatId) {
        console.log("New message via WebSocket:", message);
        setLatestMessage(message);
      } else {
        console.log("Received message for different chat:", message);
      }
    };

    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getMessage", handleMessage);
    };
  }, [socket, currentChat]);

  return { latestMessage };
}

export default useFetchLatestMessage;
