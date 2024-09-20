import { createSlice } from "@reduxjs/toolkit";
import { editPerson } from "../UserFeature/UserAction"; // Import your edit action here

const getDefaultEditState = () => ({
  data: null,
  Eloading: false,
  Eerror: null,
  Esuccess: false,
});

const editSlice = createSlice({
  name: "edit",
  initialState: {
    person: getDefaultEditState(),
  },
  reducers: {
    resetEditState: (state) => {
      state.person = getDefaultEditState();
    },
    // Add additional reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(editPerson.pending, (state) => {
        state.person.Eloading = true;
        state.person.Eerror = null;
      })
      .addCase(editPerson.fulfilled, (state, action) => {
        state.person.Esuccess = true;
        state.person.data = action.payload;
        state.person.Eloading = false;
      })
      .addCase(editPerson.rejected, (state, action) => {
        state.person.Eloading = false;
        state.person.Eerror = action.payload;
        state.person.Esuccess = false;
      });
  },
});

export const { resetEditState } = editSlice.actions;
export default editSlice.reducer;
