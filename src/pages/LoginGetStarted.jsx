import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

import familytree from "../assets/images/familytree.png";

function LoginGetStarted() {
  const userInfo = useSelector((state) => state.auth.user);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const userId = userInfo?.id || id;

  const handleGetStarted = () => {
    // Navigate to "/layout/personal-form" when the button is clicked
    navigate(`/layout/personal-form/${userId}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen m-[1px]">
        {/* Text Section */}
        <div className="md:w-[50%] flex flex-col shadow-lg justify-center items-center p-4">
          <div className="text-center">
            <h3 className="text-lg text-green font-bold mb-3 md:max-w-[30rem]">
              Your account lets you start a tree, search for family records, and
              more.
            </h3>
            {/* Conditionally render the button based on userInfo */}
            {userInfo ? (
              <button
                className="bg-green text-white py-2 px-3 rounded-2xl transition ease-in-out duration-200 transform hover:scale-105 mt-4"
                onClick={handleGetStarted}
              >
                Get started
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="bg-green text-white py-2 px-3 rounded-2xl transition ease-in-out duration-200 transform hover:scale-105 mt-4">
                  Get started
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-[50%] bg-gray-200 shadow-lg w-full">
          <img
            className="object-cover w-full h-full"
            src={familytree}
            alt="Login Image"
          />
        </div>
      </div>
    </>
  );
}

export default LoginGetStarted;
