// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const backendURL =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:8080"
//     : "https://gekoda-api.onrender.com";

// export const fetchStateDetails = createAsyncThunk(
//   "state/fetchStateDetails",
//   async (stateName, { rejectWithValue }) => {
//     try {
//       const responses = await Promise.allSettled([
//         axios.get(`${backendURL}/api/states`),
//         stateName
//           ? axios.get(`${backendURL}/api/states/${stateName}`)
//           : Promise.resolve({ data: null }),
//         axios.get(`${backendURL}/api/getReligion`),
//       ]);

//       const result = responses.reduce(
//         (acc, response, index) => {
//           if (response.status === "fulfilled") {
//             switch (index) {
//               case 0:
//                 acc.allStates = response.value.data;
//                 break;
//               case 1:
//                 acc.specificState = response.value.data;
//                 break;
//               case 2:
//                 acc.religions = response.value.data.religions;
//                 acc.tribes = response.value.data.tribes;
//                 break;
//               default:
//                 break;
//             }
//           } else {
//             console.error(`Fetch error for request ${index}:`, response.reason);
//           }
//           return acc;
//         },
//         {
//           allStates: null,
//           specificState: null,
//           religions: null,
//         }
//       );

//       return result;
//     } catch (error) {
//       return rejectWithValue(error.message || "An error occurred");
//     }
//   }
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

export const fetchStateDetails = createAsyncThunk(
  "state/fetchStateDetails",
  async (stateName, { rejectWithValue }) => {
    try {
      const responses = await Promise.allSettled([
        axios.get(`${backendURL}/api/states`),
        stateName
          ? axios.get(`${backendURL}/api/states/${stateName}`)
          : Promise.resolve({ data: null }),
        axios.get(`${backendURL}/api/getReligion`),
      ]);

      console.log("API responses:", responses); // Log responses

      const result = responses.reduce(
        (acc, response, index) => {
          if (response.status === "fulfilled") {
            switch (index) {
              case 0:
                acc.allStates = response.value.data;
                break;
              case 1:
                acc.specificState = response.value.data;
                break;
              case 2:
                acc.religions = response.value.data.religions;
                acc.tribes = response.value.data.tribes;
                break;
              default:
                break;
            }
          } else {
            console.error(`Fetch error for request ${index}:`, response.reason);
          }
          return acc;
        },
        {
          allStates: null,
          specificState: null,
          religions: null,
          tribes: null, // Add tribes to initial state
        }
      );

      return result;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);
