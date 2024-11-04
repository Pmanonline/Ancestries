import { createSlice } from "@reduxjs/toolkit";
import { fetchStateDetails } from "./stateAction";

const stateSlice = createSlice({
  name: "state",
  initialState: {
    allStates: [],
    specificState: null,
    religions: null,
    tribes: null,
    loading: false,
    error: null,
    lastFetchTime: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStateDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStateDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.allStates = action.payload.allStates || [];
        state.specificState = action.payload.specificState || null;
        state.religions = action.payload.religions || null;
        state.tribes = action.payload.tribes || null;
        state.lastFetchTime = action.payload.lastFetchTime;
      })
      .addCase(fetchStateDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default stateSlice.reducer;
