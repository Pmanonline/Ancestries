import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

export const sendConnectionRequest = createAsyncThunk(
  "connectionRequests/send",
  async ({ senderId, receiverId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId, receiverId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to send connection request"
        );
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to send connection request"
      );
    }
  }
);

// Thunk for fetching pending connection requests
export const fetchPendingRequests = createAsyncThunk(
  "connectionRequests/fetchPending",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/api/pending/${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch pending requests"
        );
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch pending requests"
      );
    }
  }
);

export const respondToConnectionRequest = createAsyncThunk(
  "connectionRequests/respond",
  async ({ requestId, response }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/confirm/${requestId}/response`,
        {
          response,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error); // Log the error for debugging
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchConnections = createAsyncThunk(
  "connections/fetchAll",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendURL}/api/connections/${userId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch connections"
      );
    }
  }
);
