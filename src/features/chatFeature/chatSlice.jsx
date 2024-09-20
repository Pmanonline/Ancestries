// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const backendURL = "http://localhost:8080";

// // Define the initial state
// const initialState = {
//   messages: [],
//   status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// // Define async thunks
// export const sendMessage = createAsyncThunk(
//   "messages/sendMessage",
//   async ({ senderId, receiverId, message }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${backendURL}/api/sendMessage`, {
//         senderId,
//         receiverId,
//         message,
//       });
//       return response.data; // Return the new message data
//     } catch (error) {
//       console.error(
//         "Error sending message:",
//         error.response ? error.response.data : error.message
//       ); // Log error
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// export const fetchMessages = createAsyncThunk(
//   "messages/fetchMessages",
//   async ({ receiverId }, { rejectWithValue }) => {
//     console.log("Fetching messages for receiverId:", receiverId); // Debug log

//     if (!receiverId) {
//       console.error("No receiverId provided");
//       throw new Error("receiverId is undefined");
//     }

//     try {
//       const response = await axios.get(
//         `${backendURL}/api/getMessages/${receiverId}`
//       );
//       console.log("API response for fetchMessages:", response.data); // Log the API response
//       return response.data;
//     } catch (error) {
//       console.error(
//         "Error fetching messages:",
//         error.response ? error.response.data : error.message
//       );
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// export const markAsRead = createAsyncThunk(
//   "messages/markAsRead",
//   async ({ receiverId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${backendURL}/api/messages/markAsRead`,
//         { receiverId }
//       );
//       console.log("Read messages", response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// // Create the slice
// const messageSlice = createSlice({
//   name: "messages",
//   messages: [],
//   status: "idle",
//   initialState,
//   reducers: {
//     // The addMessage action
//     addMessage: (state, action) => {
//       state.messages.push(action.payload); // Append the new message to the state
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendMessage.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Add the new message to the state
//         state.messages = [...state.messages, action.payload];
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(fetchMessages.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchMessages.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.messages = action.payload; // Update state with fetched messages
//         console.log("fected results", action.payload);
//       })
//       .addCase(fetchMessages.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(markAsRead.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Optionally, update state messages to reflect the read status
//         state.messages = state.messages.map((msg) =>
//           msg.receiverId === action.payload.receiverId
//             ? { ...msg, isRead: true }
//             : msg
//         );
//       })
//       .addCase(markAsRead.rejected, (state) => {
//         state.status = "failed";
//       });
//   },
// });

// export const { addMessage } = messageSlice.actions;

// export default messageSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:8080";

// Define the initial state
const initialState = {
  messages: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  readStatus: null,
  loading: false,
};

// Define async thunks
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ senderId, receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/api/sendMessage`, {
        senderId,
        receiverId,
        message,
      });
      return response.data; // Return the new message data
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendURL}/api/getMessages/${receiverId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const markAsRead = createAsyncThunk(
  "messages/markAsRead",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/messages/markAsRead`,
        { receiverId }
      );
      console.log("All marked as read", response.data);
      return response.data; // This should return a success message or updated data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Create the slice
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(markAsRead.pending, (state) => {
        state.status = "loading";
        console.log("Marking messages as read...");
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = state.messages.map((msg) =>
          msg.receiverId === action.meta.arg.receiverId
            ? { ...msg, isRead: true }
            : msg
        );
        console.log("Messages marked as read in state:", state.messages);
      })

      .addCase(markAsRead.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to mark messages as read:", action.payload);
        state.error = action.payload;
      });
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
