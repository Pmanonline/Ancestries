// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../components/context/AuthContext";
// import { ChatContext } from "../../components/context/chatContext";
// import UserChats from "../../components/chats/userChats";
// import useFetchRecipientUser from "../../components/Hooks/useFetchRecipient";
// import { PotentialChats } from "../../components/chats/potentialChats";

// // Separate component to handle each chat item
// export const ChatItem = ({ chat, user, onClick }) => {
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

// const ChatList = () => {
//   const { user } = useContext(AuthContext);
//   const { userChats, isUserChatsLoading, isUserChatsError, updateCurrentChat } =
//     useContext(ChatContext);
//   const [sortedChats, setSortedChats] = useState([]);

//   useEffect(() => {
//     if (userChats) {
//       // Sort chats by the latest message time or fallback to updatedAt
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
//         </div>
//       ) : (
//         <p>No chats available.</p>
//       )}
//     </section>
//   );
// };

// export default ChatList;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { ChatContext } from "../../components/context/chatContext";
import UserChats from "../../components/chats/userChats";
import useFetchRecipientUser from "../../components/Hooks/useFetchRecipient";

// Separate component to handle each chat item
export const ChatItem = ({ chat, user, onClick }) => {
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

const ChatList = () => {
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
    <section className="relative">
      {sortedChats.length > 0 ? (
        <div className="">
          <div className="w-full  p-2">
            {sortedChats.map((chat) => (
              <div key={chat._id}>
                <ChatItem
                  chat={chat}
                  user={user}
                  onClick={() => updateCurrentChat(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No chats available.</p>
      )}
    </section>
  );
};

export default ChatList;
