// src/utils/authUtils.js

import axios from "axios";

const apiUrl = "http://localhost:8080"; // Update with your backend URL if different

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(`${apiUrl}/api/refresh-token`, {
      token: refreshToken,
    });
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    async (config) => {
      let accessToken = getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshAccessToken();
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
};
