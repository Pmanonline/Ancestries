import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingRequests,
  respondToConnectionRequest,
  fetchConnections,
} from "../features/connectionFeature/connectionAction";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

export const PendingRequests = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const { connectionRequests, status, error } = useSelector(
    (state) => state.connectionRequests
  );

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(fetchPendingRequests(userInfo.id));
    }
  }, [dispatch, userInfo]);

  const handleResponse = async (requestId, response) => {
    try {
      await dispatch(
        respondToConnectionRequest({ requestId, response })
      ).unwrap();
      toast.success(`Request ${response}ed successfully!`);
      // Fetch updated pending requests and connections
      dispatch(fetchPendingRequests(userInfo.id));
      dispatch(fetchConnections(userInfo.id));
    } catch (err) {
      toast.error(err.message || `Failed to ${response} request.`);
    }
  };

  if (status === "loading") {
    return <div className="text-center py-4">Loading pending requests...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">
        Pending Connection Requests
      </h2>
      {connectionRequests.length === 0 ? (
        <p className="text-gray-600">No pending requests</p>
      ) : (
        connectionRequests.map((request) => (
          <div
            key={request._id}
            className="md:max-w-[30rem] flex items-center justify-between py-2 px-3 border border-gray-200 rounded-lg mb-2 bg-white shadow-sm"
          >
            <p className=" first-letter:uppercase ext-lg mod:text-sm font-semibold text-gray-900">
              {`${request?.senderId.firstName} ${request?.senderId.lastName}`}
            </p>
            <div className="space-x-2">
              <button
                onClick={() => handleResponse(request._id, "Accepted")}
                className="bg-green-500 text-white bg-blue-500 text-xs rounded-md mx-3 p-1 hover:bg-blue-600   transition ease-in-out duration-200 transform hover:scale-105"
              >
                Accept
              </button>
              <button
                onClick={() => handleResponse(request._id, "Rejected")}
                // className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                className="bg-red-500 text-white  text-xs rounded-md mx-3 p-1 hover:bg-red-600   transition ease-in-out duration-200 transform hover:scale-105"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export const ConnectionsList = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const { connections, status, error } = useSelector(
    (state) => state.connectionRequests
  );

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(fetchConnections(userInfo.id));
    }
  }, [dispatch, userInfo]);

  if (status === "loading") {
    return <div className="text-center py-4">Loading connections...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 ">My Connections</h2>
      {connections.length === 0 ? (
        <p className="text-gray-600">You have no connections yet.</p>
      ) : (
        connections.map((connection) => (
          <div
            key={connection._id}
            // className="flex items-center p-4 border border-gray-200 shadow-sm rounded-lg mb-2 bg-white"
            className="md:max-w-[30rem] flex items-center justify-between py-2 px-3 border border-gray-200 rounded-lg mb-2 bg-white shadow-sm"
          >
            {connection.userId1.image ? (
              <img
                src={`${backendURL}/${connection.userId1.image}`}
                alt={`${connection.userId1.firstName} ${connection.userId1.lastName}`}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-image.png";
                }}
              />
            ) : (
              <FaUserCircle className="w-12 h-12 text-gray-400 mr-4" />
            )}

            <div className="flex-1">
              <p className=" first-letter:uppercase ext-lg mod:text-sm font-semibold text-gray-900">
                {`${connection.userId1.firstName} ${connection.userId1.lastName}`}
              </p>
              <p className="text-sm text-gray-500">
                {connection.userId1.email || "No email provided"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export function MyConnections() {
  return (
    <div className="p-6 max-w-3xl ">
      <h1 className="text-3xl font-bold mb-6 font-Montserrat">Connections</h1>
      <PendingRequests />
      <div className="mt-8">
        <ConnectionsList />
      </div>
    </div>
  );
}
