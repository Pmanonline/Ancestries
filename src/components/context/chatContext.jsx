import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  getRequest,
  PostRequest,
} from "../../features/chatFeature/chatActions";
import { io } from "socket.io-client";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user, chat }) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [isUserChatsError, setIsUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const userId = user?.id;
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNofications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  console.log("getNotification", notifications);

  // initializie socket

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("addNewUser", userId);

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, userId]);

  useEffect(() => {
    console.log("onlineUsers", onlineUsers);
  }, [onlineUsers]);

  useEffect(() => {
    if (!socket || !newMessage) return;

    const recipientId = currentChat?.members?.find((id) => id !== userId);

    if (recipientId) {
      // console.log("Sending message:", newMessage, "to recipient:", recipientId);
      socket.emit("sendMessage", { ...newMessage, recipientId });
    }
  }, [newMessage, socket, currentChat, userId]);

  // GETMESSAGES AND NOTIFCATIONS
  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });
    socket.on("getNotification", (res) => {
      const ischatOpen = currentChat?.members.some((id) => id === res.senderId);
      if (ischatOpen) {
        setNofications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNofications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    const getUserChats = async () => {
      try {
        const response = await getRequest(`${backendURL}/api`);

        if (response.error) {
          throw new Error(response.message || "Failed to fetch chats.");
        }

        const pChats = response.data.filter((u) => {
          let isChatCreated = false;

          if (userId === u._id) return false;

          if (userChats) {
            isChatCreated = userChats?.some((chat) => {
              return chat.members[0] === u._id || chat.members[1] === u._id;
            });
          }
          return !isChatCreated;
        });
        setPotentialChats(pChats);
        setAllUsers(response);
      } catch (error) {
        console.error("Error fetching potential chats:", error);
      }
    };

    if (userId) {
      getUserChats();
    }
  }, [userChats, userId]);

  useEffect(() => {
    const getUserChats = async () => {
      if (!userId) return; // Exit early if userId is not available

      setIsUserChatsLoading(true);
      setIsUserChatsError(null);

      try {
        const response = await getRequest(`${backendURL}/api/chats/${userId}`);

        if (response.error) {
          throw new Error(response.message || "Failed to fetch chats.");
        }

        setUserChats(response.data || []);
      } catch (error) {
        setIsUserChatsError(error.message || "An error occurred.");
      } finally {
        setIsUserChatsLoading(false);
      }
    };

    getUserChats();
  }, [userId, user, notifications]);

  const updateCurrentChat = useCallback((chat) => {
    if (!chat) {
      console.error("Chat object is undefined or null:", chat);
      return;
    }

    console.log("Updating current chat to:", chat);
    setCurrentChat(chat);
  }, []);

  useEffect(() => {
    if (currentChat) {
      GetMessages(); // Fetch messages only if currentChat is set
    }
  }, [currentChat]); // Trigger message fetch when currentChat updates

  const CreateChat = async (firstId, secondId) => {
    try {
      const response = await fetch(`${backendURL}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstId, secondId }),
      });

      if (response.ok) {
        const chat = await response.json();

        // Check if the chat already exists in the userChats state
        const chatExists = userChats.some(
          (existingChat) =>
            existingChat.members.includes(firstId) &&
            existingChat.members.includes(secondId)
        );

        if (!chatExists) {
          // Only add the chat if it doesn't already exist
          setUserChats((prev) => [...prev, chat]);
        }

        return chat; // Ensure this returns the created chat object
      } else {
        const errorResponse = await response.text();
        console.error("Failed to create chat:", errorResponse);
        return null;
      }
    } catch (error) {
      console.error("Error in CreateChat:", error);
      return null;
    }
  };

  const fetchChats = useCallback(async () => {
    if (!userId) return; // Exit early if userId is not available

    setIsUserChatsLoading(true);
    setIsUserChatsError(null);

    try {
      const response = await getRequest(`${backendURL}/api/chats/${userId}`);

      if (response.error) {
        throw new Error(response.message || "Failed to fetch chats.");
      }

      setUserChats(response.data || []);
    } catch (error) {
      setIsUserChatsError(error.message || "An error occurred.");
    } finally {
      setIsUserChatsLoading(false);
    }
  }, [userId]);

  const GetMessages = async () => {
    if (!currentChat?._id) return; // Exit if no currentChat is selected

    setMessagesLoading(true);
    setMessagesError(null);

    try {
      const response = await getRequest(
        `${backendURL}/api/messages/${currentChat._id}`
      );
      console.log("currentChat._id", currentChat._id);

      if (response.error) {
        throw new Error(response.message || "Failed to fetch messages.");
      }

      setMessages(response.data || []); // Set fetched messages
    } catch (error) {
      setMessagesError(error.message || "An error occurred.");
    } finally {
      setMessagesLoading(false);
    }
  };

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      try {
        if (!textMessage) return console.log("Message can't be empty");

        const response = await PostRequest(
          `${backendURL}/api/messages`,
          JSON.stringify({
            chatId: currentChatId,
            senderId: userId,
            text: textMessage,
          })
        );

        if (response.error) {
          setSendTextMessageError(response);
          return;
        }

        setMessages((prev) => [...prev, response.data]); // Update messages state
        setNewMessage(response.data); // Set newMessage to trigger the socket event
        setTextMessage(""); // Clear the input field
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [userId]
  );

  const markAllNotificationAsRead = useCallback((notifications) => {
    const mNotification = notifications.map((n) => {
      return { ...n, isRead: true };
    });
    setNofications(mNotification);
  }, []);

  const markNotificationAsRead = useCallback(
    (n, userChats, user, notifications) => {
      // Find the chat to open
      const desiredChat = userChats.find((chat) => {
        // Check if the chat includes the senderId of the notification
        return chat.members.includes(n.senderId);
      });

      if (!desiredChat) {
        console.warn("Chat not found for notification:", n);
        return;
      }

      // Mark notifications as read
      const updatedNotifications = notifications.map((el) =>
        el.senderId === n.senderId ? { ...el, isRead: true } : el
      );

      updateCurrentChat(desiredChat);
      setNofications(updatedNotifications);
    },
    [userChats, notifications, updateCurrentChat]
  );

  const markThisUserNotification = useCallback(
    (thisUserNotification, notifications) => {
      const mNotification = notifications.map((el) => {
        // Check if the current notification's senderId matches any of the `thisUserNotification` senderIds
        const isFromThisUser = thisUserNotification.some(
          (n) => n.senderId === el.senderId
        );

        if (isFromThisUser) {
          // If it matches, mark the notification as read
          return { ...el, isRead: true };
        } else {
          // Otherwise, return the notification as is
          return el;
        }
      });

      // Update the notifications state
      setNofications(mNotification);
    },
    [setNofications] // Add dependencies here
  );

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        isUserChatsError,
        potentialChats,
        CreateChat,
        updateCurrentChat,
        messages,
        messagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationAsRead,
        markNotificationAsRead,
        markThisUserNotification,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
