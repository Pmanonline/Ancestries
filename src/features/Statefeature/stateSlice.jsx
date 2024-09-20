// import { createSlice } from "@reduxjs/toolkit";
// import { fetchStateDetails } from "./stateAction"; // Adjust the import path

// const stateSlice = createSlice({
//   name: "state",
//   initialState: {
//     allStates: null,
//     specificState: null,
//     religions: null,
//     tribes: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStateDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchStateDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.allStates = action.payload.allStates;
//         state.specificState = action.payload.specificState;
//         state.religions = action.payload.religions;
//         state.tribes = action.payload.tribes;
//         console.log("All States:", state.allStates);
//       })
//       .addCase(fetchStateDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "An error occurred";
//       });
//   },
// });

// export default stateSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchStateDetails } from "./stateAction"; // Adjust the import path

const stateSlice = createSlice({
  name: "state",
  initialState: {
    allStates: [], // Initialize as an empty array
    specificState: null,
    religions: null,
    tribes: null,
    loading: false,
    error: null,
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
        state.allStates = action.payload.allStates || []; // Ensure it defaults to an empty array
        state.specificState = action.payload.specificState || null;
        state.religions = action.payload.religions || null;
        state.tribes = action.payload.tribes || null;

        console.log("All States:", state.allStates);
        console.log("Specific State:", state.specificState);
        console.log("Religions:", state.religions);
        console.log("Tribes:", state.tribes);
      })
      .addCase(fetchStateDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
        console.error("Fetch error:", action.payload || "An error occurred");
      });
  },
});

export default stateSlice.reducer;
