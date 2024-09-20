import { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../../components/context/AuthContext";
import useFetchRecipientUser from "../../components/Hooks/useFetchRecipient";
import Spinner from "../../components/tools/Spinner";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import ImputEmoji from "react-input-emoji";
import "../.././App.css";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { BiConversation } from "react-icons/bi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ChatList from "../../components/chats/ChatLists";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

function ChatBox() {
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
  const scroll = useRef(null); // Initialize the ref

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the last message
  }, [messages]);

  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  if (!currentChat) {
    return <p>No conversation selected!</p>;
  }

  if (messagesLoading) {
    return (
      <p>
        <Spinner />
      </p>
    );
  }

  if (messagesError) {
    return <p>Error loading messages: {messagesError}</p>;
  }

  if (!recipientUser) {
    return <p>Loading recipient...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
  };

  return (
    <div className="h-full flex flex-col  z-10">
      {/* Sticky Header */}
      <div className=" flex justify-betwee  border-b">
        <div>
          <ChatNav />
        </div>
        <div className=" flex  ml-auto align-middle items-end mb-3 sm:m-3">
          {recipientUser.image ? (
            <img
              src={`${backendURL}/${recipientUser.image}`}
              alt={`${recipientUser.firstName}'s profile`}
              className="w-7 h-7 mod:w-5 mod:h-5 rounded-full object-cover mr-4"
            />
          ) : (
            <FaUserCircle className="w-7 h-7 mod:w-5 mod:h-5  text-gray-400 mr-4" />
          )}
          <h2 className="text-xl mod:text-base font-bold">
            {recipientUser.firstName} {recipientUser.lastName}
          </h2>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex flex-col space-y-2 overflow-y-auto h-full p-4">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start ${
                msg.senderId === userId ? "justify-end" : "justify-start"
              }`}
              ref={index === messages.length - 1 ? scroll : null} // Attach ref only to the last message
            >
              {msg.senderId !== userId && recipientUser.image ? (
                <div className={`mr-2`}>
                  <img
                    src={`${backendURL}/${recipientUser.image}`}
                    alt={`${recipientUser.firstName}'s profile`}
                    className="w-5 h-5 rounded-full object-cover mr-4"
                  />
                </div>
              ) : null}
              <div
                className={`flex flex-col ${
                  msg.senderId === userId ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    msg.senderId === userId
                      ? "bg-[#abace7] text-black"
                      : "bg-gray-300 text-black"
                  } max-w-full overflow-auto `}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {moment(msg?.createdAt).format("hh:mm A")}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSubmit}
        className=" relative z-0 flex items-center p-2 border-t border-gray-300"
      >
        <ImputEmoji
          type="text"
          className="px-3 py-2 mb-4 sm:mb-0 sm:mr-4 w-full focus:outline-none  focus:ring-2 focus:ring-green text-black text-sm rounded-sm ring-1 ring-green-500"
          placeholder="Type your message..."
          value={textMessage}
          onChange={setTextMessage}
        />

        <button type="submit" className="text-blue-500 text-2xl ml-2">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default ChatBox;

export const ChatNav = () => {
  const [nav, setNav] = useState(false);
  const [linkColor] = useState("#1f2937");

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <div className="z-50 flex justify-between items-center w-full px-2 2xl:px-16">
        <div>
          <div
            style={{ color: `${linkColor}` }}
            onClick={handleNav}
            className="sm:hidden cursor-pointer  flex hover:text-green m-1 border-2 p-2 rounded-tr-lg hover:border-green       rounded-bl-lg"
          >
            <BiConversation size={24} /> Chats
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 top-0 w-full h-screen bg-black/70 transition-opacity duration-300  ${
          nav ? "opacity-100 z-40" : "opacity-0 z-0"
        } ${nav ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Side Drawer Menu */}
        <div
          className={`fixed left-0 top-0 w-[95%] h-screen bg-[#ecf0f3] p-10 transition-transform duration-500 ${
            nav ? "translate-x-0" : "-translate-x-full"
          } z-50`}
        >
          <div className="flex w-full items-center justify-between">
            <div
              onClick={handleNav}
              className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
            >
              <AiOutlineClose />
            </div>
          </div>
          <div className="border-b border-gray-300 my-4"></div>

          <div className="py-4 flex flex-col h-full">
            <ul className=" overflow-y-auto my-2">
              <ChatList />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
