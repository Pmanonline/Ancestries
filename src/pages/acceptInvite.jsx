// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";

// import axios from "axios";
// import {
//   Button,
//   TextField,
//   Snackbar,
//   CircularProgress,
//   Typography,
// } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";
// import familytree from "../assets/images/familytree.png";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { DirectionButton2 } from "../components/d-button";
// import Error from "../components/tools/Error";
// import Spinner from "../components/tools/Spinner";

// const backendURL =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:8080"
//     : "https://gekoda-api.onrender.com";

// const AcceptInvite = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [tokenValid, setTokenValid] = useState(false);
//   const [inviterName, setInviterName] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   console.log(inviterName);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract token from the URL query parameters
//   const queryParams = new URLSearchParams(location.search);
//   const tokenFromUrl = queryParams.get("token");

//   useEffect(() => {
//     if (!tokenFromUrl) {
//       setError("No token provided.");
//       setSnackbarMessage("No token provided.");
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//       return;
//     }
//     // Simulate fetching inviter's name
//     // In practice, this might be fetched from an API or extracted from the token
//     setInviterName("John Doe"); // Replace with actual data
//     setTokenValid(true);
//   }, [tokenFromUrl]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setLoading(true);

//     try {
//       await axios.post(
//         `${backendURL}/api/accept-invite?token=${tokenFromUrl}`,
//         {
//           firstName,
//           lastName,
//           email,
//           password,
//         }
//       );

//       setLoading(false);
//       setSnackbarMessage("Account created successfully!");
//       setSnackbarSeverity("success");
//       setOpenSnackbar(true);

//       navigate("/login"); // Redirect to login page or other action
//     } catch (error) {
//       setLoading(false);
//       console.error("Error response:", error.response); // Log the full error response for debugging

//       if (error.response?.status === 401) {
//         setSnackbarMessage("Unauthorized: Invalid or expired token.");
//       } else {
//         const errorMsg =
//           error.response?.data?.message ||
//           "Failed to create account. Please try again.";
//         setSnackbarMessage(errorMsg);
//       }
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//     }
//   };
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen">
//       {/* Image Section */}
//       <div className="hidden md:block md:w-[50%] bg-gray-200 shadow-lg relative">
//         <img
//           className="object-cover w-full h-full"
//           src={familytree}
//           alt="Invitation Background"
//         />
//         <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-8">
//           <Typography
//             variant="h4"
//             component="h2"
//             className="font-semibold mb-4"
//           >
//             You are invited to join E-Ancestry!
//           </Typography>
//           <Typography variant="h6" component="p">
//             by {inviterName}
//           </Typography>
//         </div>
//       </div>

//       {/* Form Section */}

//       <div className="md:w-[50%] flex sm:p-8">
//         <form onSubmit={handleSubmit} className="w-full">
//           <div className="text-center">
//             <h3 className="text-3xl font-semibold mb-8">Accept Invitation</h3>
//           </div>

//           {/* First Name */}
//           <div className="my-8 w-[22rem] mx-auto">
//             <label
//               htmlFor="firstName"
//               className="block mb-2 text-sm font-semibold"
//             >
//               First Name
//             </label>
//             <input
//               placeholder="First Name"
//               id="firstName"
//               label="First Name"
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//               className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black  placeholder-gray-400  sm:text-md focus:outline-none bg-transparent"
//             />
//           </div>

//           {/* Last Name */}
//           <div className="my-8 w-[22rem] mx-auto">
//             <label
//               htmlFor="lastName"
//               className="block mb-2 text-sm font-semibold"
//             >
//               Last Name
//             </label>
//             <input
//               placeholder=" Last Name"
//               id="lastName"
//               label="Last Name"
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//               className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black  placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
//             />
//           </div>

//           {/* Email */}
//           <div className="my-8 w-[22rem] mx-auto">
//             <label htmlFor="email" className="block mb-2 text-sm font-semibold">
//               Email
//             </label>
//             <input
//               placeholder="Enter your email address"
//               autoCorrect="email"
//               id="email"
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="current-email"
//               required
//               className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
//             />
//           </div>

//           {/* Password */}
//           <div className="my-8 w-[22rem] mx-auto">
//             <label
//               htmlFor="password"
//               className="block mb-2 text-sm font-semibold"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 placeholder="*****"
//                 id="password"
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="current-password"
//                 className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black  placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
//               />
//               <span
//                 className="absolute right-3 top-[14px] cursor-pointer"
//                 onClick={togglePasswordVisibility}
//               >
//                 <MdOutlineRemoveRedEye />
//               </span>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mx-auto text-center">
//             <button
//               type="submit"
//               className="border flex justify-center mx-auto bg-green text-white py-2 px-[8rem] rounded-2xl hover:scale-105 focus:outline-none focus:bg-green"
//               disabled={loading}
//             >
//               {loading ? (
//                 <Spinner />
//               ) : (
//                 <>
//                   Register
//                   <span className="ml-2">
//                     <DirectionButton2 />
//                   </span>
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Error message */}
//           <div className="flex justify-center">
//             {error && <Error>{error}</Error>}
//           </div>

//           {/* Link to Login */}
//           <p className="mt-5 text-sm text-gray-400 text-center">
//             Already have an Account?{" "}
//             <Link
//               to="/login"
//               className="text-black font-bold hover:underline ml-2"
//             >
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AcceptInvite;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Snackbar,
  CircularProgress,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import familytree from "../assets/images/familytree.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { DirectionButton2 } from "../components/d-button";
import Error from "../components/tools/Error";
import Spinner from "../components/tools/Spinner";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

const AcceptInvite = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [tokenValid, setTokenValid] = useState(false);
  const [inviterName, setInviterName] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const tokenFromUrl = queryParams.get("token");

  useEffect(() => {
    if (!tokenFromUrl) {
      setError("No token provided.");
      setSnackbarMessage("No token provided.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    // Fetch the inviter's name and validate the token
    fetchInvitationDetails(tokenFromUrl);
  }, [tokenFromUrl]);
  const fetchInvitationDetails = async (token) => {
    try {
      const response = await axios.get(`${backendURL}/api/invitation-details`, {
        params: { token },
      });
      setInviterName(response.data.senderName);
      setRelationshipType(response.data.relationshipType);
      setTokenValid(true);
    } catch (error) {
      console.error("Error fetching invitation details:", error);
      setError("Failed to fetch inviter's details.");
      setSnackbarMessage("Failed to fetch inviter's details.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        `${backendURL}/api/accept-invite?token=${tokenFromUrl}`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      setLoading(false);
      setSnackbarMessage("Account created successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      navigate("/login"); // Redirect to login page or other action
    } catch (error) {
      setLoading(false);
      console.error("Error response:", error.response);

      if (error.response?.status === 401) {
        setSnackbarMessage("Unauthorized: Invalid or expired token.");
      } else {
        const errorMsg =
          error.response?.data?.message ||
          "Failed to create account. Please try again.";
        setSnackbarMessage(errorMsg);
      }
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Image Section */}
      <div className="hidden md:block md:w-[50%] bg-gray-200 shadow-lg relative">
        <img
          className="object-cover w-full h-full"
          src={familytree}
          alt="Invitation Background"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-8">
          <Typography
            variant="h4"
            component="h2"
            className="font-semibold mb-4"
          >
            You are invited to join E-Ancestry!
          </Typography>
          <Typography variant="h6" component="p">
            by {inviterName} {relationshipType && `as your ${relationshipType}`}
          </Typography>
        </div>
      </div>

      {/* Form Section */}
      <div className="md:w-[50%] flex sm:p-8">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="text-center">
            <h3 className="text-3xl font-semibold mb-8">Accept Invitation</h3>
          </div>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <MuiAlert
              onClose={() => setOpenSnackbar(false)}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>

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
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
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
              placeholder="Last Name"
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
            />
          </div>

          {/* Email */}
          <div className="my-8 w-[22rem] mx-auto">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold">
              Email
            </label>
            <input
              placeholder="Enter your email address"
              autoCorrect="email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="p-2 mt-1 block w-full border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
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
                <CircularProgress size={24} />
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
            {error && <Typography color="error">{error}</Typography>}
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
  );
};

export default AcceptInvite;
