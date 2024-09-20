import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SET_EMAIL } from "../types";
import Cookies from "js-cookie";

import * as jwt_decode from "jwt-decode";
// import jwt_decode from "jwt-decode";

axios.defaults.withCredentials = true;

// Define your backend URL based on the environment
const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

// Set up Axios to include credentials
axios.defaults.withCredentials = true;

// Action to set email
export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${backendURL}/api/login`,
//         { email, password },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       // Extract the token from the response
//       const { token } = response.data;

//       // Store the token in localStorage
//       localStorage.setItem("userToken", token);

//       // Return the user data
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       );
//     }
//   }
// );
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem("userToken", token);

      // Store user info in localStorage if needed
      localStorage.setItem("userInfo", JSON.stringify(user));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/register`,
        { email, password, firstName, lastName }, // Include firstName and lastName
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        await axios.post(`${backendURL}/api/registerMail`, {
          email,
          message: "Welcome to our platform!",
        });
      }

      // Store token and user info in cookies
      Cookies.set("userToken", response.data.token, { expires: 7 });
      Cookies.set("userInfo", JSON.stringify(response.data.user), {
        expires: 7,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(refreshTokenPending());
    try {
      const response = await axios.post(`${backendURL}/api/refresh-token`);
      const { token, refreshToken } = response.data;
      dispatch(refreshTokenSuccess({ token, refreshToken }));
      return { token, refreshToken };
    } catch (error) {
      dispatch(
        refreshTokenFailure(
          error.response ? error.response.data.message : error.message
        )
      );
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

// Generate OTP
export const generateOTP = createAsyncThunk(
  "auth/generateOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/generateOTP`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        return "OTP sent successfully";
      } else {
        return rejectWithValue("Failed to generate OTP");
      }
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to generate OTP"
      );
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (otp, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/api/verifyOTP`, {
        params: { code: otp },
      });

      if (response.status === 200) {
        return "OTP verified successfully";
      } else {
        return rejectWithValue("Invalid OTP");
      }
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.error
          ? error.response.data.error
          : "Failed to verify OTP"
      );
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/resetPassword`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        return response.data;
      } else {
        return rejectWithValue("Failed to reset password");
      }
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Create reset session
export const createResetSession = createAsyncThunk(
  "auth/createResetSession",
  async () => {
    try {
      const response = await axios.post(`${backendURL}/api/createResetSession`);

      if (response.status === 201) {
        return "Reset session created successfully";
      } else {
        return Promise.reject("Failed to create reset session");
      }
    } catch (error) {
      return Promise.reject(error.message || "Failed to create reset session");
    }
  }
);

// Resend email with OTP
export const resendEmail = (storedEmail) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${backendURL}/api/generateOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: storedEmail }),
      });

      if (response.ok) {
        dispatch(generateOTP(storedEmail));
        return;
      }

      throw new Error("Failed to resend email");
    } catch (error) {
      console.error("Error resending email:", error);
    }
  };
};
