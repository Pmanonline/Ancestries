// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../components/context/AuthContext";
// import { ChatContext } from "../components/context/chatContext";
// import UserChats from "../components/chats/userChats";
// import useFetchRecipientUser from "../components/Hooks/useFetchRecipient";
// import { PotentialChats } from "../components/chats/potentialChats";
// import ChatBox from "../components/chats/ChatBox";
// import "../App.css";

// // Separate component to handle each chat item
// const ChatItem = ({ chat, user, onClick }) => {
//   const { recipientUser, error } = useFetchRecipientUser(chat);

//   if (error) {
//     console.log("Error fetching recipient user:", error);
//     return <p>Error loading recipient user</p>;
//   }

//   return (
//     <div className="chat" onClick={onClick}>
//       <UserChats chat={chat} user={user} recipientUser={recipientUser} />
//     </div>
//   );
// };

// const ChatPage = () => {
//   const { user } = useContext(AuthContext);
//   const { userChats, isUserChatsLoading, isUserChatsError, updateCurrentChat } =
//     useContext(ChatContext);
//   const [sortedChats, setSortedChats] = useState([]);

//   useEffect(() => {
//     if (userChats) {
//       // Sort chats by latest message time or fallback to updatedAt
//       const sorted = [...userChats].sort((a, b) => {
//         const dateA = new Date(
//           a.latestMessage?.createdAt || a.updatedAt
//         ).getTime();
//         const dateB = new Date(
//           b.latestMessage?.createdAt || b.updatedAt
//         ).getTime();

//         // Sort by the most recent timestamp
//         return dateB - dateA;
//       });

//       setSortedChats(sorted);
//     }
//   }, [userChats]);

//   if (isUserChatsLoading) {
//     return <p>Loading chats...</p>;
//   }

//   if (isUserChatsError) {
//     return <p>Error loading chats: {isUserChatsError}</p>;
//   }

//   return (
//     <section>
//       <PotentialChats />
//       {sortedChats.length > 0 ? (
//         <div className="flex h-screen">
//           <div className="w-[40%] bg-gray-100 p-2 mod:hidden">
//             {sortedChats.map((chat) => (
//               <div key={chat._id}>
//                 <ChatItem
//                   chat={chat}
//                   user={user}
//                   onClick={() => updateCurrentChat(chat)}
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="w-[60%] bg-white p-4">
//             <ChatBox />
//           </div>
//         </div>
//       ) : (
//         <p>No chats available.</p>
//       )}
//     </section>
//   );
// };

// export default ChatPage;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { ChatContext } from "../components/context/chatContext";
import UserChats from "../components/chats/userChats";
import useFetchRecipientUser from "../components/Hooks/useFetchRecipient";
import { PotentialChats } from "../components/chats/potentialChats";
import ChatBox from "../components/chats/ChatBox";
import "../App.css";

import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";

// Separate component to handle each chat item
const ChatItem = ({ chat, user, onClick }) => {
  const { recipientUser, error } = useFetchRecipientUser(chat);

  if (error) {
    console.log("Error fetching recipient user:", error);
    return <p>Error loading recipient user</p>;
  }

  return (
    <div className="chat" onClick={onClick}>
      <UserChats chat={chat} user={user} recipientUser={recipientUser} />
    </div>
  );
};

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, isUserChatsError, updateCurrentChat } =
    useContext(ChatContext);
  const [sortedChats, setSortedChats] = useState([]);

  useEffect(() => {
    if (userChats) {
      // Sort chats by the latest message time or fallback to updatedAt
      const sorted = [...userChats].sort((a, b) => {
        const dateA = new Date(
          a.latestMessage?.createdAt || a.updatedAt
        ).getTime();
        const dateB = new Date(
          b.latestMessage?.createdAt || b.updatedAt
        ).getTime();

        // Sort by the most recent timestamp
        return dateB - dateA;
      });

      setSortedChats(sorted);
    }
  }, [userChats]);

  if (isUserChatsLoading) {
    return <p>Loading chats...</p>;
  }

  if (isUserChatsError) {
    return <p>Error loading chats: {isUserChatsError}</p>;
  }

  return (
    <section>
      {/* <PotentialChats /> */}
      {sortedChats.length > 0 ? (
        <div className="flex h-screen">
          <div className="w-[40%] bg-gray-100 p-2 mod:hidden">
            {sortedChats.map((chat) => (
              <div key={chat._id}>
                <ChatItem
                  chat={chat}
                  user={user}
                  onClick={() => updateCurrentChat(chat)} // Ensure chat is updated on click
                />
              </div>
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
