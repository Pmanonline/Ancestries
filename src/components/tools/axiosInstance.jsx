import axios from "axios";
import { isTokenExpired } from "./utils";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

// Function to refresh the token
const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axios.post(`${backendURL}/api/refresh-token`, {
    refreshToken,
  });
  const newAccessToken = response.data.accessToken;
  localStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
};

// Axios instance with interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken");

    if (isTokenExpired(token)) {
      token = await refreshAuthToken();
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
