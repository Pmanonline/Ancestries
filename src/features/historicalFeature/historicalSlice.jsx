import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllHistoricalPeople,
  fetchHistoricalPersonById,
} from "./historicalAction";

const historicalSlice = createSlice({
  name: "historicalPeople",
  initialState: {
    historicalPeople: [], // Initialize as an empty array
    historicalPerson: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHistoricalPeople.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllHistoricalPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.historicalPeople = action.payload; // Expecting payload to be an array
      })
      .addCase(fetchAllHistoricalPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling fetching by ID
      .addCase(fetchHistoricalPersonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoricalPersonById.fulfilled, (state, action) => {
        state.loading = false;
        state.historicalPerson = action.payload;
      })
      .addCase(fetchHistoricalPersonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default historicalSlice.reducer;
