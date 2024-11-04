import React, { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../../components/context/AuthContext";
import useFetchRecipientUser from "../../components/Hooks/useFetchRecipient";
import Spinner from "../../components/tools/Spinner";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import InputEmoji from "react-input-emoji";
import { AiOutlineArrowLeft } from "react-icons/ai";
import backgroundImage from "../../assets/images/backgroundImage.png";
import backendURL from "../../config";

function ChatBox({ onReturnToList }) {
  const {
    currentChat,
    messages,
    messagesLoading,
    messagesError,
    sendTextMessage,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef(null);

  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  const { onlineUsers, notifications, markThisUserNotification } =
    useContext(ChatContext);

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textMessage.trim()) {
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (messagesLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    );
  }

  if (messagesError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-500">
          Error loading messages: {messagesError}
        </p>
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col bg-gray-50"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center border-b">
        <button
          className="text-gray-600 hover:text-gray-800 mr-4 md:hidden"
          onClick={onReturnToList}
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        <div className="flex items-center">
          {recipientUser?.image ? (
            <img
              src={`${backendURL}/${recipientUser.image}`}
              alt={`${recipientUser.firstName}'s profile`}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-gray-400 mr-3" />
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {recipientUser?.firstName} {recipientUser?.lastName}
            </h2>
            <p className="text-sm text-gray-500">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === userId ? "justify-end" : "justify-start"
              }`}
              ref={index === messages.length - 1 ? scroll : null}
            >
              <div
                className={`max-w-[70%] ${
                  msg.senderId === userId
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                } rounded-lg px-4 py-2 shadow`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs opacity-75 block mt-1">
                  {moment(msg?.createdAt).format("hh:mm A")}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet</p>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="bg-white border-t p-4">
        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            cleanOnEnter
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 py-2 px-4 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <IoMdSend size={24} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatBox;
