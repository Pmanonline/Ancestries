import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import { ChatContext } from "../components/context/chatContext";
import UserChats from "../components/chats/userChats";
import ChatBox from "../components/chats/ChatBox";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineMessage,
} from "react-icons/ai";

const ChatItem = ({ chat, user, onClick, isActive }) => (
  <div
    className={`chat cursor-pointer transition-colors duration-200 ${
      isActive ? "bg-blue-100" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
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
    currentChat,
  } = useContext(ChatContext);
  const [showChatList, setShowChatList] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchChats();
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        setShowChatList(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchChats]);

  if (isUserChatsError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading chats: {isUserChatsError}
      </div>
    );
  }

  const handleChatItemClick = (chat) => {
    updateCurrentChat(chat);
    if (isMobile) {
      setShowChatList(false);
    }
  };

  const handleReturnToList = () => {
    setShowChatList(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar / Chat List */}
      <div
        className={`w-full md:w-1/3 lg:w-1/4 bg-white shadow-md transition-all duration-300 ease-in-out ${
          showChatList || !isMobile ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static absolute z-30 h-full`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <span className="flex">
            <AiOutlineMessage className="mr-2 text-gray-600" size={24} />
            <h2 className="text-lg font-bold text-gray-800">My Chats</h2>
          </span>
          <Link to={"/"}>
            <AiOutlineHome
              className="text-green-500 hover:text-gray-800 md:hidden"
              size={24}
            />
          </Link>
        </div>

        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {userChats.length > 0 ? (
            userChats.map((chat) => (
              <ChatItem
                key={chat._id}
                chat={chat}
                user={user}
                onClick={() => handleChatItemClick(chat)}
                isActive={currentChat?._id === chat._id}
              />
            ))
          ) : (
            <div className="p-4 text-gray-600">No chats available.</div>
          )}
        </div>
      </div>

      {/* Main Content / ChatBox */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          {isMobile && (
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setShowChatList(!showChatList)}
            >
              {showChatList ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          {currentChat && (!isMobile || !showChatList) ? (
            <ChatBox onReturnToList={handleReturnToList} />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Welcome to Chat
                </h2>
                <p className="text-gray-600 mb-8">
                  Select a conversation or start a new one
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
