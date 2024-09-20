import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { verifyOTP, resendEmail } from "../features/auth/authActions";
import { DirectionButton2 } from "../components/d-button";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import familytree from "../assets/images/familytree.png";
import Error from "../components/tools/Error";
import Spinner from "../components/tools/Spinner";

const VerifyOTP = () => {
  const [otp, setOTP] = useState("");
  const [storedEmail, setStoredEmail] = useState(""); // Store the email generated on the forgot password page
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, OTPsuccess } = useSelector((state) => state.auth);

  const handleOpenEmailApp = () => {
    window.location.href = `mailto:${storedEmail}`; // Open email app with stored email
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      await dispatch(verifyOTP(otp));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleResendOTP = async () => {
    try {
      await dispatch(resendEmail(storedEmail)); // Resend OTP to stored email
    } catch (error) {
      console.error("Error resending email:", error);
    }
  };

  useEffect(() => {
    if (OTPsuccess) {
      navigate("/ResetPassword");
    }
  }, [navigate, OTPsuccess]);

  useEffect(() => {
    const email = localStorage.getItem("email"); // Load stored email from localStorage
    if (email) {
      setStoredEmail(email);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen m-[1px]">
      {/* Image Section */}
      <div className="hidden md:block md:w-[50%] bg-gray-200 shadow-lg">
        <img
          className="object-cover w-full h-full mid:hidden"
          src={familytree}
          alt="Verification Image"
        />
      </div>

      {/* Verification Form Section */}
      <div className="md:w-[50%] flex sm:p-8">
        <form onSubmit={handleVerifyOTP} className="w-full">
          <div className="text-center">
            <h3>We have sent you an email</h3>
            <p className="text-gray-500 mb-4">
              Click on the email verification link sent to you on
              <span className=" italic font-semibold"> {storedEmail}</span>
              {/* Display stored email */}
            </p>
            <p className="text-black font-normal mb-4">
              Didn't Receive the email yet?{" "}
              <button className="font-medium" onClick={handleResendOTP}>
                Send Again
              </button>
            </p>
            <div className="flex justify-center items-center mb-4">
              <button
                onClick={handleOpenEmailApp}
                className="border border-purple rounded-lg p-2 focus:bg-blue-600 mr-2"
              >
                {loading ? "Opening..." : "Open Email App"}
              </button>
              <button
                onClick={handleOpenEmailApp}
                className="hover:text-purple w-10 h-10 focus:outline-none"
              >
                <MdOutlineMarkEmailUnread className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Having issues or questions?
              <Link
                to="/register"
                className="text-gray-500 font-bold hover:underline ml-2"
              >
                Contact Support
              </Link>
            </p>
          </div>

          <div className="my-8 w-[22rem] mx-auto">
            <label htmlFor="otp" className="block mb-2 text-sm font-semibold">
              Verify OTP
            </label>
            <input
              placeholder="Enter OTP"
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
              className="py-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
            />
          </div>

          <div className="mx-auto text-center">
            <button
              type="submit"
              className="border flex justify-center mx-auto bg-green text-white py-2 px-[8rem] rounded-2xl hover:scale-105 focus:outline-none focus:bg-green"
              disabled={loading}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  Verify
                  <span className="ml-2">
                    <DirectionButton2 />
                  </span>
                </>
              )}
            </button>
          </div>

          <div className="flex justify-center">
            {error && <Error>{error}</Error>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
