// import { createSlice } from "@reduxjs/toolkit";
// import { createFamilyMember } from "../UserFeature/UserAction";

// const getDefaultFormState = () => ({
//   data: null,
//   loading: false,
//   error: null,
//   success: false,
// });

// const formSlice = createSlice({
//   name: "form",
//   initialState: {
//     person: getDefaultFormState(),
//   },
//   reducers: {
//     resetSuccess: (state) => {
//       state.person.success = false;
//     },
//     resetError: (state) => {
//       state.person.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createFamilyMember.pending, (state) => {
//         state.person.loading = true;
//         state.person.error = null;
//       })
//       .addCase(createFamilyMember.fulfilled, (state, action) => {
//         state.person.success = true;
//         state.person.data = action.payload;
//         state.person.loading = false;
//       })
//       .addCase(createFamilyMember.rejected, (state, action) => {
//         state.person.loading = false;
//         state.person.error = action.payload;
//         state.person.success = false;
//       });
//   },
// });

// export const { resetSuccess, resetError } = formSlice.actions;
// export default formSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { createFamilyMember, fetchAllDetails } from "../UserFeature/UserAction";

// const getDefaultFormState = () => ({
//   data: null,
//   loading: false,
//   error: null,
//   success: false,
// });

// const formSlice = createSlice({
//   name: "form",
//   initialState: {
//     person: getDefaultFormState(),
//     fetchDetails: {
//       data: null,
//       lastFetched: null,
//       loading: false,
//       error: null,
//     },
//   },
//   reducers: {
//     resetSuccess: (state) => {
//       state.person.success = false;
//     },
//     resetError: (state) => {
//       state.person.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createFamilyMember.pending, (state) => {
//         state.person.loading = true;
//         state.person.error = null;
//       })
//       .addCase(createFamilyMember.fulfilled, (state, action) => {
//         state.person.success = true;
//         state.person.data = action.payload;
//         state.person.loading = false;
//         // Invalidate cache when new family member is created
//         state.fetchDetails.lastFetched = null;
//       })
//       .addCase(createFamilyMember.rejected, (state, action) => {
//         state.person.loading = false;
//         state.person.error = action.payload;
//         state.person.success = false;
//       })
//       .addCase(fetchAllDetails.pending, (state) => {
//         state.fetchDetails.loading = true;
//         state.fetchDetails.error = null;
//       })
//       .addCase(fetchAllDetails.fulfilled, (state, action) => {
//         state.fetchDetails.loading = false;
//         state.fetchDetails.data = action.payload;
//         state.fetchDetails.lastFetched = Date.now();
//       })
//       .addCase(fetchAllDetails.rejected, (state, action) => {
//         state.fetchDetails.loading = false;
//         state.fetchDetails.error = action.payload;
//       });
//   },
// });

// export const { resetSuccess, resetError } = formSlice.actions;
// export default formSlice.reducer;

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
    lastFetched: null,
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
    invalidateCache: (state) => {
      state.fetchDetails.lastFetched = null;
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
        state.fetchDetails.lastFetched = null; // Invalidate cache
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
        state.fetchDetails.loading = false;
        state.fetchDetails.data = action.payload;
        state.fetchDetails.lastFetched = Date.now();
      })
      .addCase(fetchAllDetails.rejected, (state, action) => {
        state.fetchDetails.loading = false;
        state.fetchDetails.error = action.payload;
        state.fetchDetails.data = null;
      });
  },
});

export const { resetSuccess, resetError, invalidateCache } = formSlice.actions;
export default formSlice.reducer;
