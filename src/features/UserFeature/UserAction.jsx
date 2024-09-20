import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; // If needed for handling cookies
import axiosInstance from "../../components/tools/axiosInstance"; //

// Define your backend URL based on the environment
const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

export const createFamilyMember = createAsyncThunk(
  "form/createFamilyMember",
  async ({ memberType, formData }, { rejectWithValue }) => {
    try {
      console.log("Creating family member of type:", memberType);
      console.log("Form data:", formData);

      const token = localStorage.getItem("userToken");

      if (!token) {
        throw new Error("No token found.");
      }

      const response = await axios.post(
        `${backendURL}/api/${memberType}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response data:", response.data);

      return { memberType, data: response.data };
    } catch (error) {
      console.error("Error creating family member:", error);

      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const fetchAllDetails = createAsyncThunk(
  "person/fetchAllDetails",
  async (userId, { rejectWithValue }) => {
    console.log("userId before making requests:", userId);

    const token = localStorage.getItem("userToken");
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      console.log(`Fetching details for userId: ${userId}`);
      // Array of fetch requests
      const fetchRequests = [
        axios.get(`${backendURL}/api/GetMother/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${backendURL}/api/GetPerson/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${backendURL}/api/GetFather/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${backendURL}/api/GetPGFather/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${backendURL}/api/GetPGMother/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${backendURL}/api/GetMGFather/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${backendURL}/api/GetMGMother/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${backendURL}/api/get_MGrtGrandFather/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${backendURL}/api/get_MGrtGrandMother/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${backendURL}/api/get_PGrtGrandMother/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${backendURL}/api/get_PGrtGrandFather/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ];

      // Perform fetch requests and handle each individually
      const responses = await Promise.allSettled(fetchRequests);

      const result = responses.reduce(
        (acc, response, index) => {
          // Handling response based on status
          if (response.status === "fulfilled") {
            // Extract endpoint from index
            switch (index) {
              case 0:
                acc.mother = response.value.data;
                break;
              case 1:
                acc.person = response.value.data;
                break;
              case 2:
                acc.father = response.value.data;
                break;
              case 3:
                acc.PGF = response.value.data;
                break;
              case 4:
                acc.PGM = response.value.data;
                break;
              case 5:
                acc.MGF = response.value.data;
                break;
              case 6:
                acc.MGM = response.value.data;
                break;
              case 7:
                acc.MGGF = response.value.data;
                break;
              case 8:
                acc.MGGM = response.value.data;
                break;
              case 9:
                acc.PGGM = response.value.data;
                break;
              case 10:
                acc.PGGF = response.value.data;
                break;
              default:
                break;
            }
          } else {
            // Handle individual fetch errors
            console.error(`Fetch error for request ${index}:`, response.reason);
          }
          return acc;
        },
        {
          mother: null,
          person: null,
          father: null,
          PGF: null,
          MGF: null,
          PGM: null,
          MGM: null,
          MGGF: null,
          MGGM: null,
          PGGM: null,
          PGGF: null,
        }
      );

      return result;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const editPerson = createAsyncThunk(
  "person/editPerson",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const { _id, file, ...dataToUpdate } = formData;
      console.log("FormData ID:", _id); // Log the ID to verify

      // Prepare FormData for submission
      const formPayload = new FormData();
      for (const key in dataToUpdate) {
        if (dataToUpdate.hasOwnProperty(key)) {
          formPayload.append(key, dataToUpdate[key]);
        }
      }

      // Append the image if it exists
      if (file) {
        formPayload.append("file", file); // Ensure field name is 'file'
      }

      console.log("FormPayload:", formPayload);

      const response = await axios.put(
        `${backendURL}/api/updatePerson/${_id}`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error editing person details:", error);
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Function to delete a person
export const deletePerson = createAsyncThunk(
  "person/deletePerson",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.delete(
        `${backendURL}/api/deletePerson/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId, { rejectWithValue }) => {
    console.log(`Thunk User ID: ${userId}`);

    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        throw new Error("No token found.");
      }

      const response = await axios.get(
        `${backendURL}/api/getProfile/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error); // Debugging output
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getAllProfiles = createAsyncThunk(
  "profile/fetchAllProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        throw new Error("No token found.");
      }

      const response = await axios.get(`${backendURL}/api/getAllProfiles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Expecting an array of profiles
    } catch (error) {
      console.error("Error fetching profiles:", error); // Debugging output
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (searchParams, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      // Filter out empty values from searchParams
      const filteredParams = Object.fromEntries(
        Object.entries(searchParams).filter(
          ([key, value]) => value.trim() !== ""
        )
      );

      // Construct the query string from filteredParams
      const query = new URLSearchParams(filteredParams).toString();

      console.log("Constructed query string:", query);

      // Make the GET request using axios
      const response = await axios.get(`${backendURL}/api/search?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fetch Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "userSearch/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        throw new Error("No token found.");
      }

      const response = await axios.get(`${backendURL}/api/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
