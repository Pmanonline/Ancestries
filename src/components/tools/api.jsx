// src/utils/api.js

import axios from "axios";
import store from "../store";
import { setCredentials, logoutUser } from "../../features/auth/authSlice";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.userInfo?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = store.getState().auth.userInfo?.refreshToken;
      try {
        const response = await api.post("/api/refresh-token", { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        store.dispatch(
          setCredentials({
            token: accessToken,
            refreshToken: newRefreshToken,
            user: store.getState().auth.userInfo.user,
          })
        );
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutUser());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
