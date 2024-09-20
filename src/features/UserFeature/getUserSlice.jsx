import { createSlice } from "@reduxjs/toolkit";
import { fetchAllDetails, getProfile, getAllProfiles } from "./UserAction";

const initialState = {
  person: {},
  mother: {},
  father: {},
  PGF: {},
  PGM: {},
  MGF: {},
  MGM: {},
  MGGF: {},
  MGGM: {},
  PGGM: {},
  PGGF: {},
  profile: null, // Single profile
  profiles: [],
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllDetails.fulfilled, (state, action) => {
        state.person = action.payload.person || {};
        state.mother = action.payload.mother || {};
        state.father = action.payload.father || {};
        state.PGF = action.payload.PGF || {};
        state.PGM = action.payload.PGM || {};
        state.MGF = action.payload.MGF || {};
        state.MGM = action.payload.MGM || {};
        state.MGGF = action.payload.MGGF || {};
        state.MGGM = action.payload.MGGM || {};
        state.PGGM = action.payload.PGGM || {};
        state.PGGF = action.payload.PGGF || {};

        state.loading = false;
        state.success = true;
        console.log("Updated State:", state);
      })
      .addCase(fetchAllDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload; // Set the single profile
        state.loading = false;
        state.success = true;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getAllProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload; // Set all profiles
        state.loading = false;
        state.success = true;
      })
      .addCase(getAllProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSuccess } = userSlice.actions;
export default userSlice.reducer;
