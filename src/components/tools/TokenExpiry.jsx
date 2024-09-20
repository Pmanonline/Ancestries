import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure proper import
import { logoutUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const useTokenExpiration = () => {
  const dispatch = useDispatch();

  // Function to check token expiration and auto-logout
  const checkTokenExpiration = () => {
    const token = Cookies.get("accessToken"); // Retrieve the access token from cookies

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds

        // Calculate time until token expires
        const timeUntilExpiration = expirationTime - Date.now();

        if (timeUntilExpiration > 0) {
          // Token is still valid, set a timeout to log out the user when the token expires
          setTimeout(() => {
            alert("Your session has expired. Logging out...");
            dispatch(logoutUser()); // This clears the user state and removes tokens
          }, timeUntilExpiration);
        } else {
          // Token is already expired, logout immediately
          alert("Your session has expired. Logging out...");
          dispatch(logoutUser());
        }
      } catch (error) {
        console.error("Invalid token:", error);
        dispatch(logoutUser()); // If decoding fails, log out the user
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration(); // Check token expiration on component mount

    // Optionally, set up periodic checks (e.g., every minute) to ensure timely logout
    const intervalId = setInterval(checkTokenExpiration, 60 * 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return { checkTokenExpiration };
};

export default useTokenExpiration;
