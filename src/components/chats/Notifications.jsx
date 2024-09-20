// import { useContext, useState, useEffect, useRef } from "react";
// import { ChatContext } from "../context/chatContext";
// import { AuthContext } from "../../components/context/AuthContext";
// import { FaEnvelope } from "react-icons/fa";
// import { FiMessageSquare } from "react-icons/fi";
// import { UnreadNotificationfunction } from "../chats/UnreadNotificationfunction";
// import moment from "moment";

// function NotificationBar() {
//   const {
//     notifications,
//     userChats,
//     allUsers,
//     markAllNotificationAsRead,
//     markNotificationAsRead,
//   } = useContext(ChatContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const notificationRef = useRef(null);
//   const { user } = useContext(AuthContext);

//   const unreadNotifications = UnreadNotificationfunction(notifications);

//   // Group notifications by sender
//   const groupedNotifications = groupNotificationsBySender(
//     notifications,
//     allUsers.data
//   );

//   const toggleNotification = () => {
//     setIsOpen((prev) => !prev);
//   };

//   // Handle click outside to close the notification
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [notificationRef]);

//   return (
//     <div className="relative">
//       <div className="relative cursor-pointer" onClick={toggleNotification}>
//         <FiMessageSquare size={24} className="relative hover:text-green" />
//         {unreadNotifications.length > 0 && (
//           <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
//             {unreadNotifications.length}
//           </span>
//         )}
//       </div>

//       {isOpen && (
//         <>
//           {/* Overlay */}
//           <div
//             className="absolute inset-0 opacity-50 z-10"
//             onClick={() => setIsOpen(false)}
//           ></div>

//           {/* Notification Box */}
//           <div
//             ref={notificationRef}
//             className="absolute right-0 mt-5 p-4 bg-white rounded-lg shadow-lg w-80 z-20 border border-gray-200"
//           >
//             <header className="flex justify-between items-center pb-3 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 Notifications
//               </h3>
//               <button
//                 onClick={() => markAllNotificationAsRead(notifications)}
//                 className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
//               >
//                 Mark all as read
//               </button>
//             </header>

//             {groupedNotifications.length === 0 ? (
//               <div className="py-4 text-center text-gray-500">
//                 No Notifications yet...
//               </div>
//             ) : (
//               <ul className="mt-3 space-y-2 ">
//                 {groupedNotifications.map((group, index) => (
//                   <li
//                     key={index}
//                     className={`flex justify-between items-center p-3 rounded-md ${
//                       group.isRead
//                         ? "bg-gray-50"
//                         : "bg-blue-50 hover:bg-blue-100"
//                     }`}
//                     onClick={() => {
//                       console.log("Marking notification as read:", group);
//                       markNotificationAsRead(
//                         group.latestNotification,
//                         userChats,
//                         user,
//                         notifications
//                       );
//                       setIsOpen(false);
//                     }}
//                   >
//                     <div>
//                       <p className="text-sm text-gray-800 font-medium">
//                         New message from{" "}
//                         <span className="font-semibold text-lg">
//                           {group.senderName}
//                         </span>
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {moment(group.latestNotification.date).calendar()}
//                       </p>
//                     </div>
//                     <div
//                       className={`w-3 h-3 rounded-full ${
//                         group.isRead ? "bg-gray-300" : "bg-blue-500"
//                       }`}
//                     ></div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default NotificationBar;

// // Function to group notifications by sender and consolidate them into a single entry
// export const groupNotificationsBySender = (notifications, allUsers) => {
//   const grouped = notifications.reduce((acc, notification) => {
//     const sender = allUsers.find((user) => user._id === notification.senderId);
//     const senderName = sender ? sender.firstName : "Unknown";

//     if (!acc[senderName]) {
//       acc[senderName] = {
//         senderName,
//         isRead: notification.isRead,
//         latestNotification: notification,
//       };
//     } else {
//       // Update the latest notification time and isRead status
//       acc[senderName].latestNotification = notification;
//       acc[senderName].isRead = notification.isRead && acc[senderName].isRead;
//     }

//     return acc;
//   }, {});

//   return Object.values(grouped);
// };

// import { useContext, useState, useEffect, useRef } from "react";
// import { ChatContext } from "../context/chatContext";
// import { AuthContext } from "../../components/context/AuthContext";
// import { FaEnvelope } from "react-icons/fa";
// import { FiMessageSquare } from "react-icons/fi";
// import { UnreadNotificationfunction } from "../chats/UnreadNotificationfunction";
// import { useNavigate, useLocation } from "react-router-dom";
// import moment from "moment";

// function NotificationBar() {
//   const {
//     notifications,
//     userChats,
//     allUsers,
//     markAllNotificationAsRead,
//     markNotificationAsRead,
//   } = useContext(ChatContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const notificationRef = useRef(null);
//   const { user } = useContext(AuthContext);

//   const unreadNotifications = UnreadNotificationfunction(notifications);

//   // Group notifications by sender
//   const groupedNotifications = groupNotificationsBySender(
//     notifications,
//     allUsers.data
//   );

//   const toggleNotification = () => setIsOpen((prev) => !prev);

//   // Handle click outside to close the notification
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [notificationRef]);

//   const handleMarkAllAsRead = () => {
//     markAllNotificationAsRead(notifications);
//   };

//   const handleNotificationClick = (group) => {
//     markNotificationAsRead(
//       group.latestNotification,
//       userChats,
//       user,
//       notifications
//     );
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative">
//       <div className="relative cursor-pointer" onClick={toggleNotification}>
//         <FiMessageSquare size={24} className="relative hover:text-green" />
//         {unreadNotifications.length > 0 && (
//           <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
//             {unreadNotifications.length}
//           </span>
//         )}
//       </div>

//       {isOpen && (
//         <>
//           {/* Overlay */}
//           <div
//             className="absolute inset-0 opacity-50 z-10"
//             onClick={() => setIsOpen(false)}
//           ></div>

//           {/* Notification Box */}
//           <div
//             ref={notificationRef}
//             className="absolute right-0 mt-5 p-4 bg-white rounded-lg shadow-lg w-80 z-20 border border-gray-200"
//           >
//             <header className="flex justify-between items-center pb-3 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 Notifications
//               </h3>
//               <button
//                 onClick={handleMarkAllAsRead}
//                 className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
//               >
//                 Mark all as read
//               </button>
//             </header>

//             {groupedNotifications.length === 0 ? (
//               <div className="py-4 text-center text-gray-500">
//                 No Notifications yet...
//               </div>
//             ) : (
//               <ul className="mt-3 space-y-2">
//                 {groupedNotifications.map((group, index) => (
//                   <li
//                     key={index}
//                     className={`flex justify-between items-center p-3 rounded-md ${
//                       group.isRead
//                         ? "bg-gray-50"
//                         : "bg-blue-50 hover:bg-blue-100"
//                     }`}
//                     onClick={() => handleNotificationClick(group)}
//                   >
//                     <div>
//                       <p className="text-sm text-gray-800 font-medium">
//                         New message from{" "}
//                         <span className="font-semibold text-lg">
//                           {group.senderName}
//                         </span>
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {moment(group.latestNotification.date).calendar()}
//                       </p>
//                     </div>
//                     <div
//                       className={`w-3 h-3 rounded-full ${
//                         group.isRead ? "bg-gray-300" : "bg-blue-500"
//                       }`}
//                     ></div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default NotificationBar;

// // Function to group notifications by sender and consolidate them into a single entry
// export const groupNotificationsBySender = (notifications, allUsers) => {
//   const grouped = notifications.reduce((acc, notification) => {
//     const sender = allUsers.find((user) => user._id === notification.senderId);
//     const senderName = sender ? sender.firstName : "Unknown";

//     if (!acc[senderName]) {
//       acc[senderName] = {
//         senderName,
//         isRead: notification.isRead,
//         latestNotification: notification,
//       };
//     } else {
//       // Update the latest notification time and isRead status
//       acc[senderName].latestNotification = notification;
//       acc[senderName].isRead = notification.isRead && acc[senderName].isRead;
//     }

//     return acc;
//   }, {});

//   return Object.values(grouped);
// };

import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../../components/context/AuthContext";
import { FiMessageSquare } from "react-icons/fi";
import { UnreadNotificationfunction } from "../chats/UnreadNotificationfunction";
import moment from "moment";

function NotificationBar() {
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationAsRead,
    markNotificationAsRead,
    updateCurrentChat, // Ensure this function is available in your ChatContext
    CreateChat, // Ensure this function is available in your ChatContext
  } = useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);
  const { user } = useContext(AuthContext);

  const unreadNotifications = UnreadNotificationfunction(notifications);
  const groupedNotifications = groupNotificationsBySender(
    notifications,
    allUsers.data
  );

  const navigate = useNavigate();

  const toggleNotification = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  const handleMarkAllAsRead = () => {
    markAllNotificationAsRead(notifications);
  };

  const handleNotificationClick = async (group) => {
    try {
      const senderId = group.latestNotification.senderId;
      const chat = await CreateChat(user._id, senderId); // Create or get chat

      if (chat) {
        // Update current chat with the returned chat object
        updateCurrentChat(chat, user, userChats);

        // Navigate to chat page
        navigate("/chatPage");
      } else {
        console.error("Chat creation failed, no chat object returned");
      }

      // Mark the notification as read
      await markNotificationAsRead(
        group.latestNotification,
        userChats,
        user,
        notifications
      );

      // Update the state of notifications to reflect the change
      const updatedNotifications = notifications.map((notification) =>
        notification._id === group.latestNotification._id
          ? { ...notification, isRead: true }
          : notification
      );

      // Assuming you have a method in your context to update notifications
      updateNotificationsState(updatedNotifications);
    } catch (error) {
      console.error("Error handling notification click:", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative cursor-pointer" onClick={toggleNotification}>
        <FiMessageSquare size={24} className="relative hover:text-green" />
        {unreadNotifications.length > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
            {unreadNotifications.length}
          </span>
        )}
      </div>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="absolute inset-0 opacity-50 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Notification Box */}
          <div
            ref={notificationRef}
            className="absolute right-0 mt-5 p-4 bg-white rounded-lg shadow-lg w-80 z-20 border border-gray-200"
          >
            <header className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Notifications
              </h3>
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                Mark all as read
              </button>
            </header>

            {groupedNotifications.length === 0 ? (
              <div className="py-4 text-center text-gray-500">
                No Notifications yet...
              </div>
            ) : (
              <ul className="mt-3 space-y-2">
                {groupedNotifications.map((group, index) => (
                  <li
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-md ${
                      group.isRead
                        ? "bg-gray-50"
                        : "bg-blue-50 hover:bg-blue-100"
                    }`}
                    onClick={() => handleNotificationClick(group)}
                  >
                    <div>
                      <p className="text-sm text-gray-800 font-medium">
                        New message from{" "}
                        <span className="font-semibold text-lg">
                          {group.senderName}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {moment(group.latestNotification.date).calendar()}
                      </p>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        group.isRead ? "bg-gray-300" : "bg-blue-500"
                      }`}
                    ></div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationBar;

// Function to group notifications by sender and consolidate them into a single entry
export const groupNotificationsBySender = (notifications, allUsers) => {
  const grouped = notifications.reduce((acc, notification) => {
    const sender = allUsers.find((user) => user._id === notification.senderId);
    const senderName = sender ? sender.firstName : "Unknown";

    if (!acc[senderName]) {
      acc[senderName] = {
        senderName,
        isRead: notification.isRead,
        latestNotification: notification,
      };
    } else {
      // Update the latest notification time and isRead status
      acc[senderName].latestNotification = notification;
      acc[senderName].isRead = notification.isRead && acc[senderName].isRead;
    }

    return acc;
  }, {});

  return Object.values(grouped);
};
