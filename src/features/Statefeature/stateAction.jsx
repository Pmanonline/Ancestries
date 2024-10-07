import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8080";

// Helper function to check if data is stale
const isDataStale = (lastFetchTime) => {
  const staleDuration = 5 * 60 * 1000; // 5 minutes
  return !lastFetchTime || Date.now() - lastFetchTime > staleDuration;
};

export const fetchStateDetails = createAsyncThunk(
  "state/fetchStateDetails",
  async (stateName, { getState, rejectWithValue }) => {
    const state = getState().state;

    // Check if we have data and it's not stale
    if (
      state.allStates.length > 0 &&
      state.religions &&
      state.tribes &&
      !isDataStale(state.lastFetchTime)
    ) {
      // If we have a specific state and it matches the requested one, return early
      if (
        stateName &&
        state.specificState &&
        state.specificState.name === stateName
      ) {
        return {
          allStates: state.allStates,
          specificState: state.specificState,
          religions: state.religions,
          tribes: state.tribes,
        };
      }
    }

    try {
      const responses = await Promise.allSettled([
        axios.get(`${backendURL}/api/states`),
        stateName
          ? axios.get(`${backendURL}/api/states/${stateName}`)
          : Promise.resolve({ data: null }),
        axios.get(`${backendURL}/api/getReligion`),
      ]);

      const result = responses.reduce(
        (acc, response, index) => {
          if (response.status === "fulfilled") {
            switch (index) {
              case 0:
                acc.allStates = response.value.data;
                break;
              case 1:
                acc.specificState = response.value.data;
                break;
              case 2:
                acc.religions = response.value.data.religions;
                acc.tribes = response.value.data.tribes;
                break;
              default:
                break;
            }
          } else {
            console.error(`Fetch error for request ${index}:`, response.reason);
          }
          return acc;
        },
        {
          allStates: [],
          specificState: null,
          religions: null,
          tribes: null,
        }
      );

      return { ...result, lastFetchTime: Date.now() };
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);
