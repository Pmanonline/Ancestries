import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useFetchRecipientUser from "../../components/Hooks/useFetchRecipient";
import { FaUserCircle } from "react-icons/fa";
import { ChatContext } from "../context/chatContext";
import { UnreadNotificationfunction } from "../chats/UnreadNotificationfunction";
import useFetchLatestMessage from "../Hooks/useFetchLatestMessage";
import moment from "moment";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

function UserChats({ chat, user }) {
  const { recipientUser, error } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotification } =
    useContext(ChatContext);

  const { latestMessage } = useFetchLatestMessage(chat);

  const unreadNotifications = UnreadNotificationfunction(notifications);
  const thisUserNotification = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id
  );

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const truncateText = (text) => {
    let shorttext = text.substring(0, 20);
    if (text.length > 20) {
      shorttext = shorttext + "...";
    }
    return shorttext;
  };

  // console.log(latestMessage, "latestMessage");

  return (
    <Link>
      <div
        onClick={() => {
          if (thisUserNotification?.length !== 0) {
            markThisUserNotification(thisUserNotification, notifications);
          }
        }}
        className="flex items-center p-4 rounded-lg m-2  overflow-y-auto  bg-white hover:bg-gray-100 border-b border-gray-200 cursor-pointer transition"
      >
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : recipientUser ? (
          <div className="flex items-center w-full p-2 border-b border-gray-300">
            {/* Profile Image */}
            {recipientUser.image ? (
              <img
                src={`${backendURL}/${recipientUser.image}`}
                alt={`${recipientUser.firstName}'s profile`}
                className="w-9 h-9 mod:w-7 mod:h-7 rounded-full object-cover mr-4"
              />
            ) : (
              <FaUserCircle className=" w-9 h-9 mod:w-7 mod:h-7 text-gray-400 mr-4" />
            )}

            {/* Details Container */}
            <div className="flex-1 flex justify-between items-center">
              {/* Text Content */}
              <div className="flex-1 mr-4">
                <p className="text-sm  mod:text-base font-medium text-gray-900">
                  {recipientUser.firstName} {recipientUser.lastName}
                </p>
                <p className="text-sm  text-gray-500 truncate">
                  {latestMessage?.text && truncateText(latestMessage.text)}
                </p>
              </div>

              {/* Time and Notifications */}
              <div className="flex flex-col items-end">
                {/* Online Status Dot */}
                {isOnline && (
                  <span className="hidden md:block w-3.5 h-3.5 bg-green border-2 border-white rounded-full mb-1"></span>
                )}

                {/* Unread Notifications */}
                {thisUserNotification.length > 0 && (
                  <span className="flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full w-4 h-4">
                    {thisUserNotification.length}
                  </span>
                )}

                {/* Time */}
                <p className="text-sm text-gray-500">
                  {moment(latestMessage?.createdAt).format("hh:mm A")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading recipient...</p>
        )}
      </div>
    </Link>
  );
}

export default UserChats;
