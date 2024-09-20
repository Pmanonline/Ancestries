// src/redux/inviteSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

export const sendInvite = createAsyncThunk(
  "invite/sendInvite",
  async ({ inviteType, recipient, name, relationshipType }, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        throw new Error("No token found.");
      }

      const response = await axios.post(
        `${backendURL}/api/send-invite`,
        {
          inviteType,
          recipient,
          name,
          relationshipType, // Added relationshipType here
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly place headers here
          },
        }
      );

      return response.data; // Returning data on success
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      ); // Handling error
    }
  }
);

export const recordVisit = createAsyncThunk(
  "invite/recordVisit",
  async ({ visitorId, visitedId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/api/record-visit`, {
        visitorId,
        visitedId,
      });
      console.log("Visit Data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const fetchVisits = createAsyncThunk(
  "visit/fetchVisits",
  async ({ visitorId, visitedId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/api/fetch-visits`, {
        params: { visitorId, visitedId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const fetchUserInvites = createAsyncThunk(
  "invites/fetchUserInvites",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(
        `${backendURL}/api/getUsersInvites/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch invites");
      }
      const data = await response.json();
      console.log(data, "Api response: " + JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
