import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/authActions";
import Error from "../components/tools/Error";
import Spinner from "../components/tools/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import familytree from "../assets/images/familytree.png";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, RSTsuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword({ email, password }));
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  useEffect(() => {
    if (RSTsuccess) {
      toast.success("Password reset successfully. You can now log in.");
      setTimeout(() => navigate("/login"), 3000); // Redirect to login page after 3 seconds
    }
  }, [RSTsuccess, navigate]);

  return (
    <div className="flex flex-col md:flex-row h-screen m-[1px]">
      {/* Image Section */}
      <div className="hidden md:block md:w-[50%] bg-gray-200 shadow-lg">
        <img
          className="object-cover w-full h-full mid:hidden"
          src={familytree}
          alt="Reset Password Image"
        />
      </div>

      {/* Reset Password Form Section */}
      <div className="md:w-[50%] flex sm:p-8">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="text-center">
            <h3 className="text-3xl font-semibold mb-8">Reset Password</h3>
          </div>

          <div className="my-8 w-[22rem] mx-auto">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="py-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-8 w-[22rem] mx-auto">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold"
            >
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="py-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mx-auto text-center">
            <button
              type="submit"
              className="border flex justify-center mx-auto bg-green text-white py-2 px-[8rem] rounded-2xl hover:scale-105 focus:outline-none focus:bg-green"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Reset Password"}
            </button>
          </div>

          <div className="flex justify-center mt-5">
            {error && <Error>{error}</Error>}
          </div>

          <p className="mt-4 text-center text-sm text-gray-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-black font-bold hover:underline ml-2"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={9000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ResetPassword;
