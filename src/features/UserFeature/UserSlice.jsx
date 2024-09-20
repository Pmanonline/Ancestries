import { createSlice } from "@reduxjs/toolkit";
import { createFamilyMember } from "../UserFeature/UserAction";

const getDefaultFormState = () => ({
  data: null,
  loading: false,
  error: null,
  success: false,
});

const formSlice = createSlice({
  name: "form",
  initialState: {
    person: getDefaultFormState(),
  },
  reducers: {
    resetSuccess: (state) => {
      state.person.success = false;
    },
    resetError: (state) => {
      state.person.error = null;
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
      });
  },
});

export const { resetSuccess, resetError } = formSlice.actions;
export default formSlice.reducer;
