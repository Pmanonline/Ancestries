import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL
const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://127.0.0.1:8080/" // Fallback to localhost during development
    : import.meta.env.VITE_BACKEND_URL; // Use the environment variable in production

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from the state
      const token = getState().auth.userToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: "account/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserDetails: build.query({
      query: () => ({
        url: "api/user/profile",
        method: "GET",
      }),
    }),
  }),
});

// Extract hooks for each endpoint
export const { useLoginUserMutation, useGetUserDetailsQuery } = authApi;

export default authApi;
