// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import familytree from "../assets/images/familytree.png";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { DirectionButton2 } from "../components/d-button";
// import Error from "../components/tools/Error";
// import Spinner from "../components/tools/Spinner";
// import { registerUser } from "../features/auth/authActions";
// import { resetSuccess } from "../features/auth/authSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { loading, error, RGSsuccess } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(resetSuccess());
//   }, [dispatch]);

//   useEffect(() => {
//     if (RGSsuccess) {
//       toast.success("Registered successfully. You can now log in.");
//       setTimeout(() => {
//         dispatch(resetSuccess());
//         navigate("/login");
//       }, 3000); // Redirect to login page after 3 seconds
//     }
//   }, [RGSsuccess, navigate, dispatch]);

//   const submitForm = (data) => {
//     data.email = data.email.toLowerCase();
//     dispatch(registerUser(data))
//       .then((response) => {
//         // Registration success handled in useEffect
//       })
//       .catch((error) => {
//         console.error("Registration error:", error);
//       });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const handleLoginSuccess = (decodedToken) => {
//     console.log("Login Success:", decodedToken);
//   };

//   const handleLoginFailure = (error) => {
//     console.error("Login Failed:", error);
//   };
//   return (
//     <>
//       <div className="flex flex-col md:flex-row h-screen m-[1px]">
//         {/* Image Section */}
//         <div className="hidden md:block md:w-[50%] bg-gray-200">
//           <img
//             className="object-cover w-full h-full mid:hidden"
//             src={familytree}
//             alt="Register Image"
//           />
//         </div>

//         {/* Register Form Section */}
//         <div className="md:w-[50%] flex sm:p-8">
//           <form onSubmit={handleSubmit(submitForm)} className="w-full">
//             <div className="text-center">
//               <h3 className="text-3xl font-semibold mb-8">Sign up</h3>
//             </div>
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
//                 className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-black sm:text-md focus:outline-none bg-transparent"
//               />
//             </div>

//             <div className="my-8 w-[22rem] mx-auto">
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-semibold"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   placeholder="*****"
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   {...register("password")}
//                   autoComplete="current-password"
//                   required
//                   className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-black sm:text-md focus:outline-none bg-transparent"
//                 />
//                 <span
//                   className="absolute right-3 top-[14px] cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                 >
//                   <MdOutlineRemoveRedEye />
//                 </span>
//               </div>
//             </div>

//             {/* Submit Button */}
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
//                     Register
//                     <span className="ml-2">
//                       <DirectionButton2 />
//                     </span>
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Error message */}
//             <div className="flex justify-center">
//               {error && <Error>{error}</Error>}
//             </div>

//             {/* Link to Login */}
//             <p className="mt-5 text-sm text-gray-400 text-center">
//               Already have an Account?{" "}
//               <Link
//                 to="/login"
//                 className="text-black font-bold hover:underline ml-2"
//               >
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import familytree from "../assets/images/familytree.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { DirectionButton2 } from "../components/d-button";
import Error from "../components/tools/Error";
import Spinner from "../components/tools/Spinner";
import { registerUser } from "../features/auth/authActions";
import { resetSuccess } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, RGSsuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetSuccess());
  }, [dispatch]);

  useEffect(() => {
    if (RGSsuccess) {
      toast.success("Registered successfully. You can now log in.");
      setTimeout(() => {
        dispatch(resetSuccess());
        navigate("/login");
      }, 3000); // Redirect to login page after 3 seconds
    }
  }, [RGSsuccess, navigate, dispatch]);

  const submitForm = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data))
      .then((response) => {
        // Registration success handled in useEffect
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen m-[1px]">
        {/* Image Section */}
        <div className="hidden md:block md:w-[50%] bg-gray-200">
          <img
            className="object-cover w-full h-full mid:hidden"
            src={familytree}
            alt="Register Image"
          />
        </div>

        {/* Register Form Section */}
        <div className="md:w-[50%] flex sm:p-8">
          <form onSubmit={handleSubmit(submitForm)} className="w-full">
            <div className="text-center">
              <h3 className="text-3xl font-semibold mb-8">Sign up</h3>
            </div>

            {/* First Name */}
            <div className="my-8 w-[22rem] mx-auto">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-semibold"
              >
                First Name
              </label>
              <input
                placeholder="First Name"
                id="firstName"
                name="firstName"
                type="text"
                {...register("firstName")}
                required
                className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black  placeholder-gray-400  sm:text-md focus:outline-none bg-transparent"
              />
            </div>

            {/* Last Name */}
            <div className="my-8 w-[22rem] mx-auto">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-semibold"
              >
                Last Name
              </label>
              <input
                placeholder=" Last Name"
                id="lastName"
                name="lastName"
                type="text"
                {...register("lastName")}
                required
                className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black  placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
              />
            </div>

            {/* Email */}
            <div className="my-8 w-[22rem] mx-auto">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold"
              >
                Email
              </label>
              <input
                placeholder="Enter your email address"
                autoCorrect="email"
                id="email"
                name="email"
                type="email"
                {...register("email")}
                autoComplete="current-email"
                required
                className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
              />
            </div>

            {/* Password */}
            <div className="my-8 w-[22rem] mx-auto">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  placeholder="*****"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  autoComplete="current-password"
                  required
                  className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black  placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
                />
                <span
                  className="absolute right-3 top-[14px] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <MdOutlineRemoveRedEye />
                </span>
              </div>
            </div>

            {/* Submit Button */}
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
                    Register
                    <span className="ml-2">
                      <DirectionButton2 />
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Error message */}
            <div className="flex justify-center">
              {error && <Error>{error}</Error>}
            </div>

            {/* Link to Login */}
            <p className="mt-5 text-sm text-gray-400 text-center">
              Already have an Account?{" "}
              <Link
                to="/login"
                className="text-black font-bold hover:underline ml-2"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
