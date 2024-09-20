import { createContext, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/chatFeature/chatActions";
import { setCredentials } from "../../features/auth/authSlice"; // Import your action for setting credentials
import axios from "axios";

export const AuthContext = createContext();

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
  });

  console.log(user, "user info from redux");
  console.log("registerInfo", registerInfo);

  // Fetch user data when the component mounts or token changes
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        setCredentials({
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          user: response.data.user,
        })
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("User endpoint not found");
      } else {
        console.error("Failed to fetch user data:", error);
      }
    }
  };

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const RegisterUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsRegisterLoading(true);
      setIsRegisterError(null);

      try {
        const response = await registerUser(
          `${backendURL}/api/register`,
          JSON.stringify(registerInfo)
        );
        setIsRegisterLoading(false);

        if (response.error) {
          return setIsRegisterError(response.error);
        }

        dispatch(setCredentials(response)); // Update Redux store
      } catch (error) {
        setIsRegisterLoading(false);
        setIsRegisterError("An unexpected error occurred. Please try again.");
        console.error("Registration error:", error);
      }
    },
    [registerInfo, dispatch]
  );

  return (
    <AuthContext.Provider
      value={{
        user, // Provide user from Redux
        registerInfo,
        updateRegisterInfo,
        RegisterUser,
        isRegisterLoading,
        isRegisterError,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
