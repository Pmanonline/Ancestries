import { createSlice } from "@reduxjs/toolkit";
import { createFamilyMember, fetchAllDetails } from "./UserAction";

const initialState = {
  person: {
    data: null,
    loading: false,
    error: null,
    success: false,
  },
  fetchDetails: {
    data: null,
    loading: false,
    error: null,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.person.success = false;
    },
    resetError: (state) => {
      state.person.error = null;
    },
    logout: (state) => {
      state.person.data = null; // Clear person data
      state.fetchDetails.data = null; // Clear family details
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFamilyMember.pending, (state) => {
        state.person.loading = true;
        state.person.error = null;
      })
      .addCase(createFamilyMember.fulfilled, (state, action) => {
        state.person.success = true;
        state.person.data = action.payload;
        state.person.loading = false;
      })
      .addCase(createFamilyMember.rejected, (state, action) => {
        state.person.loading = false;
        state.person.error = action.payload;
        state.person.success = false;
      })
      .addCase(fetchAllDetails.pending, (state) => {
        state.fetchDetails.loading = true;
        state.fetchDetails.error = null;
      })
      .addCase(fetchAllDetails.fulfilled, (state, action) => {
        console.log("Fetched Data:", action.payload); // Log the fetched data
        state.fetchDetails.loading = false;
        state.fetchDetails.data = action.payload; // Store fetched data
      })
      .addCase(fetchAllDetails.rejected, (state, action) => {
        state.fetchDetails.loading = false;
        state.fetchDetails.error = action.payload;
        state.fetchDetails.data = null;
      });
  },
});

export const { resetSuccess, resetError, logout } = formSlice.actions;
export default formSlice.reducer;
