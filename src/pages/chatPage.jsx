import React, { useContext, useEffect } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { ChatContext } from "../components/context/chatContext";
import UserChats from "../components/chats/userChats";
import ChatBox from "../components/chats/ChatBox";
import "../App.css";

const ChatItem = ({ chat, user, onClick }) => (
  <div className="chat" onClick={onClick}>
    <UserChats chat={chat} user={user} />
  </div>
);

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const {
    userChats,
    isUserChatsLoading,
    isUserChatsError,
    updateCurrentChat,
    fetchChats,
  } = useContext(ChatContext);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    console.log("Current userChats in ChatPage:", userChats);
  }, [userChats]);

  if (isUserChatsLoading) {
    return <p>Loading chats...</p>;
  }

  if (isUserChatsError) {
    return <p>Error loading chats: {isUserChatsError}</p>;
  }

  return (
    <section>
      {userChats.length > 0 ? (
        <div className="flex h-screen">
          <div className="w-[40%] bg-gray-100 p-2 mod:hidden">
            {userChats.map((chat) => (
              <ChatItem
                key={chat._id}
                chat={chat}
                user={user}
                onClick={() => updateCurrentChat(chat)}
              />
            ))}
          </div>
          <div className="sm:w-[60%] w-full bg-white p-4">
            <ChatBox />
          </div>
        </div>
      ) : (
        <p>No chats available.</p>
      )}
    </section>
  );
};

export default ChatPage;
