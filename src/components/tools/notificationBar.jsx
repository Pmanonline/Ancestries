import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../features/chatFeature/chatSlice";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function NotificationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const userInfo = useSelector((state) => state.auth.user);
  const receiverId = userInfo?.id; // The current user is the receiver

  useEffect(() => {
    if (receiverId) {
      dispatch(fetchMessages({ receiverId }))
        .unwrap()
        .then((data) => {
          // Filter messages that are unread and where the current user is the receiver
          const unreadMessages = data.filter(
            (msg) => !msg.isRead && msg.receiverId === receiverId
          );
          console.log("Unread Messages Count:", unreadMessages.length);
          console.log("Unread messages:", unreadMessages);
          setUnreadCount(unreadMessages.length);
        });
    }
  }, [dispatch, receiverId]);

  const handleClick = () => {
    navigate(`/chat/${receiverId}`);
  };

  return (
    <>
      <div
        className={`relative ${
          unreadCount > 0 ? "opacity-100" : "opacity-0"
        } lg:hiden`}
        onClick={handleClick}
      >
        <FaEnvelope size={24} className="relative" />
        {unreadCount > 0 && (
          <span className="absolute top-4  right- transform translate-x-1/2 -translate-y-1/2 bg-red-400 text-white text-xs font-bold rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </div>
    </>
  );
}

export default NotificationBar;
