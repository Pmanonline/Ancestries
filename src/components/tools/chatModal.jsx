// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchMessages,
//   sendMessage,
//   addMessage,
// } from "../../features/chatFeature/chatSlice";
// import { useSocket } from "../../components/tools/socketProvider";
// import { useLocation } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { formatDistanceToNow, isValid } from "date-fns";
// import { IoMdSend } from "react-icons/io";
// import { IoIosClose } from "react-icons/io";
// import {
//   getProfile,
//   getAllProfiles,
// } from "../../features/UserFeature/UserAction";
// import EmojiPicker from "emoji-picker-react";
// import "../.././App.css";

// const backendURL =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:8080"
//     : "https://gekoda-api.onrender.com";

// function ChatModal({ userId, isOpen, onClose }) {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const conversationId = location.pathname.split("/")[2];
//   const { profile, loading, error } = useSelector((state) => state.person);
//   const userInfo = useSelector((state) => state.auth.user);
//   const senderId = userInfo?.id; // Current user's ID
//   const receiverId = conversationId; // Receiver ID from the URL

//   const [text, setText] = useState("");
//   const [showPicker, setShowPicker] = useState(false);
//   const socket = useSocket();
//   const messages = useSelector((state) => state.messages.messages || []);
//   const messagesEndRef = useRef(null);
//   const senderImage = userInfo?.image || null; // Sender's image
//   const receiverImage = profile?.image || null; // Receiver's image

//   useEffect(() => {
//     if (userId) {
//       dispatch(getProfile(userId));
//     }
//   }, [dispatch, userId]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (userId) {
//         try {
//           await dispatch(getProfile(userId)).unwrap();
//         } catch (error) {
//           console.error("Failed to fetch profile data:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (socket) {
//       socket.emit("register", receiverId);

//       socket.on("receiveMessage", (message) => {
//         dispatch(addMessage(message));
//       });

//       return () => {
//         socket.off("receiveMessage");
//       };
//     }
//   }, [socket, dispatch, receiverId]);

//   useEffect(() => {
//     if (receiverId) {
//       dispatch(fetchMessages({ receiverId }));
//     }
//   }, [dispatch, receiverId]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim() && senderId && receiverId) {
//       const message = {
//         conversationId,
//         senderId,
//         receiverId,
//         message: text,
//       };

//       dispatch(sendMessage(message))
//         .then(() => {
//           socket.emit("sendMessage", message);
//           setText(""); // Clear the input field
//         })
//         .catch((error) => {
//           console.error("Error sending message:", error);
//         });
//     }
//   };

//   const handleEmojiClick = (emojiObject) => {
//     setText((prevText) => prevText + emojiObject.emoji);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("image", file);

//       // You should send the image to your server and handle it in the backend
//       // Example:
//       fetch(`${backendURL}/api/upload`, {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           const message = {
//             conversationId,
//             senderId,
//             receiverId,
//             message: data.imageUrl, // URL or identifier of the uploaded image
//           };
//           dispatch(sendMessage(message))
//             .then(() => {
//               socket.emit("sendMessage", message);
//             })
//             .catch((error) => {
//               console.error("Error sending image message:", error);
//             });
//         })
//         .catch((error) => {
//           console.error("Error uploading image:", error);
//         });
//     }
//   };
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!emojiPickerRef.current.contains(event.target)) {
//         setShowPicker(false);
//       }
//     };
//     if (showPicker) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showPicker]);

//   const emojiPickerRef = useRef(null);

//   if (!isOpen) return null;

//   return (
//     <div className="p-5 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-lg h-[80vh] max-h-[90vh] relative">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="text-lg font-semibold">
//             {profile.lastName} {profile.firstName} {profile.middlename}
//           </h3>
//           <button
//             className="text-gray-600 hover:text-gray-900"
//             onClick={onClose}
//           >
//             <IoIosClose size={24} />
//           </button>
//         </div>

//         <div className="flex flex-col h-full p-4 bg-gray-100">
//           <div className="flex-grow overflow-auto p-2">
//             <div className="space-y-4 px-2">
//               {Array.isArray(messages) && messages.length > 0 ? (
//                 messages.map((msg) => {
//                   const messageDate = new Date(msg.createdAt);
//                   const timeAgo = isValid(messageDate)
//                     ? formatDistanceToNow(messageDate, { addSuffix: true })
//                     : "Invalid date"; // Fallback for invalid dates

//                   return (
//                     <div
//                       key={msg._id}
//                       className={`flex items-start ${
//                         msg.senderId === senderId
//                           ? "justify-end"
//                           : "justify-start"
//                       }`}
//                     >
//                       <div className="mr-2">
//                         {msg.senderId === senderId ? (
//                           senderImage ? (
//                             <img
//                               src={`${backendURL}/${senderImage}`}
//                               alt="Sender Profile"
//                               className="rounded-full"
//                             />
//                           ) : (
//                             <FaUserCircle className="w-4 h-4" />
//                           )
//                         ) : receiverImage ? (
//                           <img
//                             src={`${backendURL}/${receiverImage}`}
//                             alt="Receiver Profile"
//                             className="w-4 h-4 rounded-full"
//                           />
//                         ) : (
//                           <FaUserCircle className="w-4 h-4" />
//                         )}
//                       </div>
//                       <div
//                         className={`flex flex-col ${
//                           msg.senderId === senderId
//                             ? "items-end"
//                             : "items-start"
//                         }`}
//                       >
//                         <div
//                           className={`p-2 rounded-lg ${
//                             msg.senderId === senderId
//                               ? "bg-[#abace7] text-black"
//                               : "bg-gray-300 text-black"
//                           } max-w-full overflow-auto`}
//                         >
//                           {msg.message.startsWith("http") ? (
//                             <img
//                               src={msg.message}
//                               alt="Sent"
//                               className="max-w-xs max-h-48 rounded-lg"
//                             />
//                           ) : (
//                             <p className="text-sm break-words whitespace-pre-wrap">
//                               {msg.message}
//                             </p>
//                           )}
//                           <span className="text-xs text-gray-500 mt-1">
//                             {timeAgo}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p>No messages available</p>
//               )}

//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="relative flex items-center p-2 border-t border-gray-300"
//           >
//             {/* Upload Button on the Left */}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="hidden"
//               id="imageUpload"
//             />
//             <label
//               htmlFor="imageUpload"
//               className="mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
//             >
//               📷
//             </label>

//             {/* Container for text input and emoji button */}
//             <div className="relative flex-grow flex items-center">
//               <input
//                 type="text"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-l-lg pr-12"
//                 placeholder="Type a message..."
//               />
//               <button
//                 type="button"
//                 className="absolute right-[-0.4rem] flex items-center pr-3"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setShowPicker(!showPicker);
//                 }}
//               >
//                 😊
//               </button>
//               {showPicker && (
//                 <div
//                   className="absolute bottom-full right-12 mt-1 z-50"
//                   ref={emojiPickerRef}
//                 >
//                   <EmojiPicker onEmojiClick={handleEmojiClick} />
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
//             >
//               <IoMdSend className="text-sm" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatModal;

// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchMessages,
//   sendMessage,
//   addMessage,
//   markAsRead,
// } from "../../features/chatFeature/chatSlice";
// import { useSocket } from "../../components/tools/socketProvider";
// import { useLocation } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { formatDistanceToNow, isValid } from "date-fns";
// import { IoMdSend } from "react-icons/io";
// import { IoIosClose } from "react-icons/io";
// import { getProfile } from "../../features/UserFeature/UserAction";
// import EmojiPicker from "emoji-picker-react";
// import "../.././App.css";

// const backendURL =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:8080"
//     : "https://gekoda-api.onrender.com";

// function ChatModal({ userId, isOpen, onClose }) {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const conversationId = location.pathname.split("/")[2];
//   const { profile } = useSelector((state) => state.person);
//   const userInfo = useSelector((state) => state.auth.user);
//   const socket = useSocket();
//   const messages = useSelector((state) => state.messages.messages || []);
//   const messagesEndRef = useRef(null);
//   const emojiPickerRef = useRef(null);

//   const [text, setText] = useState("");
//   const [showPicker, setShowPicker] = useState(false);

//   const senderId = userInfo?.id;
//   const receiverId = conversationId;
//   const senderImage = userInfo?.image;
//   const receiverImage = profile?.image;

//   useEffect(() => {
//     if (userId) {
//       dispatch(getProfile(userId));
//     }
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (socket) {
//       socket.emit("register", receiverId);

//       socket.on("receiveMessage", (message) => {
//         dispatch(addMessage(message));
//       });

//       return () => {
//         socket.off("receiveMessage");
//       };
//     }
//   }, [socket, dispatch, receiverId]);

//   useEffect(() => {
//     if (receiverId) {
//        dispatch(markAsRead({ receiverId }));
//       dispatch(fetchMessages({ receiverId }));
//     }
//   }, [dispatch, receiverId]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(event.target)
//       ) {
//         setShowPicker(false);
//       }
//     };

//     if (showPicker) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showPicker]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim() && senderId && receiverId) {
//       const message = {
//         conversationId,
//         senderId,
//         receiverId,
//         message: text,
//       };

//       dispatch(sendMessage(message))
//         .then(() => {
//           socket.emit("sendMessage", message);
//           setText(""); // Clear the input field
//         })
//         .catch((error) => {
//           console.error("Error sending message:", error);
//         });
//     }
//   };

// const handleEmojiClick = (emojiObject) => {
//   setText((prevText) => prevText + emojiObject.emoji);
// };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("image", file);

//       fetch(`${backendURL}/api/upload`, {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           const message = {
//             conversationId,
//             senderId,
//             receiverId,
//             message: data.imageUrl,
//           };
//           dispatch(sendMessage(message))
//             .then(() => {
//               socket.emit("sendMessage", message);
//             })
//             .catch((error) => {
//               console.error("Error sending image message:", error);
//             });
//         })
//         .catch((error) => {
//           console.error("Error uploading image:", error);
//         });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="p-5 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-lg h-[80vh] max-h-[90vh] relative">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="text-lg font-semibold">
//             {profile.lastName} {profile.firstName} {profile.middlename}
//           </h3>
//           <button
//             className="text-gray-600 hover:text-gray-900"
//             onClick={onClose}
//           >
//             <IoIosClose size={24} />
//           </button>
//         </div>

//         <div className="flex flex-col h-full p-4 bg-gray-100">
//           <div className="flex-grow overflow-auto p-2">
//             <div className="space-y-4 px-2">
//               {messages.length > 0 ? (
//                 messages.map((msg) => {
//                   const messageDate = new Date(msg.createdAt);
//                   const timeAgo = isValid(messageDate)
//                     ? formatDistanceToNow(messageDate, { addSuffix: true })
//                     : "Invalid date";

//                   return (
//                     <div
//                       key={msg._id}
//                       className={`flex items-start ${
//                         msg.senderId === senderId
//                           ? "justify-end"
//                           : "justify-start"
//                       }`}
//                     >
//                       <div className="mr-2">
//                         {msg.senderId === senderId ? (
//                           senderImage ? (
//                             <img
//                               src={`${backendURL}/${senderImage}`}
//                               alt="Sender Profile"
//                               className="rounded-full"
//                             />
//                           ) : (
//                             <FaUserCircle className="w-4 h-4" />
//                           )
//                         ) : receiverImage ? (
//                           <img
//                             src={`${backendURL}/${receiverImage}`}
//                             alt="Receiver Profile"
//                             className="w-4 h-4 rounded-full"
//                           />
//                         ) : (
//                           <FaUserCircle className="w-4 h-4" />
//                         )}
//                       </div>
//                       <div
//                         className={`flex flex-col ${
//                           msg.senderId === senderId
//                             ? "items-end"
//                             : "items-start"
//                         }`}
//                       >
//                         <div
//                           className={`p-2 rounded-lg ${
//                             msg.senderId === senderId
//                               ? "bg-[#abace7] text-black"
//                               : "bg-gray-300 text-black"
//                           } max-w-full overflow-auto`}
//                         >
//                           {msg.message.startsWith("http") ? (
//                             <img
//                               src={msg.message}
//                               alt="Sent"
//                               className="max-w-xs max-h-48 rounded-lg"
//                             />
//                           ) : (
//                             <p className="text-sm break-words whitespace-pre-wrap">
//                               {msg.message}
//                             </p>
//                           )}
//                           <span className="text-xs text-gray-500 mt-1">
//                             {timeAgo}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p>No messages available</p>
//               )}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="relative flex items-center p-2 border-t border-gray-300"
//           >
//             {/* Upload Button on the Left */}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="hidden"
//               id="imageUpload"
//             />
//             <label
//               htmlFor="imageUpload"
//               className="mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
//             >
//               📷
//             </label>

//             {/* Container for text input and emoji button */}
//             <div className="relative flex-grow flex items-center">
//               <input
//                 type="text"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-l-lg pr-12"
//                 placeholder="Type a message..."
//               />
//               <button
//                 type="button"
//                 className="absolute right-2 z-50"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setShowPicker(!showPicker);
//                 }}
//               >
//                 😊
//               </button>
//               {showPicker && (
//                 <div
//                   className="absolute bottom-full right-2 mt-1 z-50"
//                   ref={emojiPickerRef}
//                 >
//                   <EmojiPicker onEmojiClick={handleEmojiClick} />
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
//             >
//               <IoMdSend size={20} />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatModal;
// ChatModal.jsx
