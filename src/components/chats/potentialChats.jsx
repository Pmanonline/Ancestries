import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../../components/context/AuthContext";

export function PotentialChats() {
  const { potentialChats, CreateChat, onlineUsers } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  return (
    <div className="all-users p-4 space-y-4 cursor-pointer">
      {potentialChats &&
        potentialChats.map((u, index) => {
          return (
            <div
              key={index}
              onClick={() => CreateChat(userId, u._id)}
              className="flex items-center p-4 bg-white shadow-md rounded-lg space-x-4"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {u.firstName} {u.lastName}
                </p>
              </div>
              {onlineUsers?.some((user) => user?.userId === u?._id) ? (
                <span className="w-3.5 h-3.5 bg-green border-2 border-white rounded-full mb-1"></span>
              ) : (
                ""
              )}
            </div>
          );
        })}
    </div>
  );
}
