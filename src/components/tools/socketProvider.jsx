// SocketProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const socketIo = io("http://localhost:8080");
  //   setSocket(socketIo);

  //   return () => {
  //     socketIo.disconnect();
  //   };
  // }, []);
  useEffect(() => {
    const backendURL =
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:8080";

    const socketIo = io(backendURL);
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
