import { createSlice } from "@reduxjs/toolkit";
import {
  sendConnectionRequest,
  fetchPendingRequests,
  respondToConnectionRequest,
  fetchConnections,
} from "./connectionAction";

const connectionSlice = createSlice({
  name: "connectionRequests",
  initialState: {
    connections: [],
    connectionRequests: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    success: false,
  },
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling sendConnectionRequest
      .addCase(sendConnectionRequest.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = false;
      })
      .addCase(sendConnectionRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.success = true;
      })
      .addCase(sendConnectionRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Handling fetchPendingRequests
      .addCase(fetchPendingRequests.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPendingRequests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.connectionRequests = action.payload;
        state.success = true;
      })
      .addCase(fetchPendingRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.success = false;
      })

      .addCase(respondToConnectionRequest.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = false;
      })
      .addCase(respondToConnectionRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.success = true;
        // Optionally update state based on the response
      })
      .addCase(respondToConnectionRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || action.error.message;
        state.success = false;
      })
      // Handling fetch all connections
      .addCase(fetchConnections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.connections = action.payload;
      })
      .addCase(fetchConnections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = connectionSlice.actions;
export default connectionSlice.reducer;
