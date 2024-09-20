import { createSlice } from "@reduxjs/toolkit";
import { fetchNameDetails } from "./nameAction";

const initialState = {
  allNames: [],
  specificName: null,
  loading: false,
  error: null,
};

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.allNames = action.payload.allNames;
        state.specificName = action.payload.specificName;
      })
      .addCase(fetchNameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch name details";
      });
  },
});

export default nameSlice.reducer;
