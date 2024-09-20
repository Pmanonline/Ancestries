import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.auth.user);
  const userId = userInfo?.id;
  const navigate = useNavigate(); // Import useNavigate from react-router-dom

  // Show loading indicator if authentication state is loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login page if userInfo is falsy
  if (!userInfo) {
    navigate("/login"); // Navigate to the login page
    return null; // Render nothing while redirecting
  }

  // Show unauthorized screen if there's an error or userInfo is not available
  if (error || !userInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-700 to-purple-500">
        <div className="max-w-md p-8 bg-white shadow-md rounded-lg mx-auto text-center">
          <h1 className="text-3xl font-semibold text-red-500 mb-4">
            Authorization Required
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            You need to log in to access this page.
          </p>
          <NavLink
            to="/login"
            className="text-center inline-block bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-700"
          >
            Log in
          </NavLink>
        </div>
      </div>
    );
  }

  // Render nested routes if user is authenticated
  return <Outlet />;
};

export default ProtectedRoute;
