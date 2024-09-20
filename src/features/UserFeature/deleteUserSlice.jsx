import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deletePerson } from "../UserFeature/UserAction"; // Adjust the import path as needed

const getDefaultDeleteState = () => ({
  data: null,
  Dloading: false,
  Derror: null,
  Dsuccess: false,
});

// Create the slice
const deleteSlice = createSlice({
  name: "delete",
  initialState: {
    person: getDefaultDeleteState(),
    mother: getDefaultDeleteState(),
    father: getDefaultDeleteState(),
    // Add other delete forms if needed
  },
  reducers: {
    resetDeleteState: (state) => {
      state.person = getDefaultDeleteState();
      state.mother = getDefaultDeleteState();
      state.father = getDefaultDeleteState();
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle deletePerson
      .addCase(deletePerson.pending, (state) => {
        state.person.Dloading = true;
        state.person.Derror = null;
        state.person.Dsuccess = false;
      })
      .addCase(deletePerson.fulfilled, (state, action) => {
        state.person.Dsuccess = true;
        state.person.data = action.payload;
        console.log("was deleted?", action.payload);
        state.person.Dloading = false;
      })
      .addCase(deletePerson.rejected, (state, action) => {
        state.person.Dloading = false;
        state.person.Derror = action.payload;
        state.person.Dsuccess = false;
      });
  },
});

// Export actions and reducer
export const { resetDeleteState } = deleteSlice.actions;
export default deleteSlice.reducer;
