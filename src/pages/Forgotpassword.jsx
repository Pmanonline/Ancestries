// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import familytree from "../assets/images/familytree.png";
// import { DirectionButton2 } from "../components/d-button";
// import { resetSuccess } from "../features/auth/authSlice";
// import { useForm } from "react-hook-form";
// import Error from "../components/tools/Error";
// import Spinner from "../components/tools/Spinner";
// import { Link, useNavigate } from "react-router-dom";

// function Forgotpassword() {
//   const { loading, userInfo, error, success } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const submitForm = (data) => {
//     dispatch(loginUser(data));
//   };
//   return (
//     <>
//       <div className="flex flex-col md:flex-row h-screen m-[1px]">
//         {/* Image Section */}
//         <div className="hidden md:block md:w-[50%] bg-gray-200 shadow-lg ">
//           <img
//             className="object-cover w-full h-full mid:hidden"
//             src={familytree}
//             alt="Login Image"
//           />
//         </div>

//         {/* Login Form Section */}
//         <div className="md:w-[50%] flex sm:p-8">
//           <form onSubmit={handleSubmit(submitForm)} className="w-full">
//             <div className="my-8 w-[22rem] mx-auto">
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-semibold"
//               >
//                 Email
//               </label>
//               <input
//                 placeholder="*****"
//                 id="email"
//                 name="email"
//                 type="email"
//                 {...register("email")}
//                 autoComplete="current-email"
//                 required
//                 className="py-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-black sm:text-md focus:outline-none bg-transparent"
//               />
//             </div>

//             <div className="mx-auto text-center">
//               <button
//                 type="submit"
//                 className="border flex justify-center mx-auto bg-green text-white py-2 px-[8rem] rounded-2xl hover:scale-105 focus:outline-none focus:bg-green"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Spinner />
//                 ) : (
//                   <>
//                     Login
//                     <span className="ml-2">
//                       <DirectionButton2 />
//                     </span>
//                   </>
//                 )}
//               </button>
//             </div>

//             <div className="flex justify-center">
//               {error && <Error>{error}</Error>}
//             </div>

//             <p className="mt-5 text-sm text-gray-400 text-center">
//               Don't have an account?
//               <Link
//                 to="/register"
//                 className="text-black font-bold hover:underline ml-2"
//               >
//                 Signup
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Forgotpassword;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { generateOTP } from "../features/auth/authActions";
import { resetSuccess } from "../features/auth/authSlice";
import { DirectionButton2 } from "../components/d-button";
import familytree from "../assets/images/familytree.png";
import Error from "../components/tools/Error";
import Spinner from "../components/tools/Spinner";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { register } = useForm();
  const navigate = useNavigate();
  const { loading, error, FPsuccess } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  // Load email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      console.log("Stored Email:", storedEmail); // Log the stored email to the console
    }
    dispatch(resetSuccess()); // Reset success flags when the component mounts
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch action to generate OTP and send to email
      await dispatch(generateOTP(email));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Redirect to VerifyOtpPage if FPsuccess is true
  useEffect(() => {
    if (FPsuccess) {
      navigate("/VerifyOtpPage");
    }
  }, [navigate, FPsuccess]);

  // Update email state and localStorage on input change
  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    localStorage.setItem("email", value);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen m-[1px]">
      {/* Image Section */}
      <div className="hidden md:block md:w-[50%] bg-gray-200 shadow-lg">
        <img
          className="object-cover w-full h-full mid:hidden"
          src={familytree}
          alt="Login Image"
        />
      </div>

      {/* Login Form Section */}

      <div className="md:w-[50%] flex sm:p-8">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="text-center">
            <h3>Resset your password</h3>
          </div>
          <div className="my-8 w-[22rem] mx-auto">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold">
              Email
            </label>
            <input
              placeholder="Enter your email address"
              id="email"
              name="email"
              type="email"
              {...register("email")}
              onChange={handleChange}
              autoComplete="current-email"
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
                  Send OTP
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

          <p className="mt-5 text-sm text-gray-400 text-center">
            Don't have an account?
            <Link
              to="/register"
              className="text-black font-bold hover:underline ml-2"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
