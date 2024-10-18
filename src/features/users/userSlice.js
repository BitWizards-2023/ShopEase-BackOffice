import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Async Thunks

// Fetch user list
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/v1/User/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Register a new user
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/v1/Auth/register", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/v1/User/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update FCM Token
export const updateFCMToken = createAsyncThunk(
  "users/updateFCMToken",
  async (fcmToken, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/v1/User/update-fcm-token",
        { fcmToken }, // Request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Assuming the response contains the updated user data
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/v1/User/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Activate user
export const activateUser = createAsyncThunk(
  "users/activateUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/v1/User/${id}/activate`,
        {}, // Empty body if no data is needed
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Approve user
export const approveUser = createAsyncThunk(
  "users/approveUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/v1/User/${id}/approve`,
        {}, // Empty body if no data is needed
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  users: [],
  status: "idle",
  error: null,
};

// User slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Register User
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload); // Add new user to the list
      })

      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data; // Adjust based on your API response structure
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      // Update FCM Token
      .addCase(updateFCMToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFCMToken.fulfilled, (state, action) => {
        const updatedUser = action.payload.data; // Adjust based on your API response structure
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateFCMToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
      })

      // Activate User
      .addCase(activateUser.fulfilled, (state, action) => {
        const user = state.users.find((user) => user.id === action.meta.arg);
        if (user) user.isActive = true;
      })

      // Approve User
      .addCase(approveUser.fulfilled, (state, action) => {
        const user = state.users.find((user) => user.id === action.meta.arg);
        if (user) user.isApproved = true;
      });
  },
});

export default userSlice.reducer;
