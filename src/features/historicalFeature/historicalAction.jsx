import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

// Fetch all historical people
export const fetchAllHistoricalPeople = createAsyncThunk(
  "historicalPeople/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/api/AllhistoricalPeople`);
      console.log("API Response: ", response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching historical people:", error);
      return rejectWithValue(
        error.message || "Failed to fetch historical people"
      );
    }
  }
);

// Fetch a historical person by ID
export const fetchHistoricalPersonById = createAsyncThunk(
  "historicalPeople/fetchById",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${backendURL}/api/historicalPeople/${userId}`
      );
      return response.data; // No need to call response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
