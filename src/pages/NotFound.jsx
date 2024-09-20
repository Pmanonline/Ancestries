import React from "react";
import { Link } from "react-router-dom";
import NoResult from "../assets/images/noResult.png";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        src={NoResult}
        alt="404 Not Found"
        className="w-96 h-96 object-contain mb-8 rounded-2xl"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-3">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 text-black underline font-semibold rounded-lg hover:bg-green-600 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
