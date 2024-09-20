import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

export const fetchNameDetails = createAsyncThunk(
  "name/fetchNameDetails",
  async (nameValue, { rejectWithValue }) => {
    try {
      const nameFormatted =
        typeof nameValue === "string"
          ? encodeURIComponent(nameValue.replace(/ /g, "-"))
          : "";

      const responses = await Promise.allSettled([
        axios.get(`${backendURL}/api/names`),
        nameFormatted
          ? axios.get(`${backendURL}/api/names/${nameFormatted}`)
          : Promise.resolve({ data: null }),
      ]);

      const result = responses.reduce(
        (acc, response, index) => {
          if (response.status === "fulfilled") {
            switch (index) {
              case 0:
                acc.allNames = response.value.data;
                break;
              case 1:
                acc.specificName = response.value.data;
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
          allNames: null,
          specificName: null,
        }
      );

      return result;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);
