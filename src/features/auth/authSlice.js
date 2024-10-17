// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { jwtDecode } from "jwt-decode"; // Make sure to use the correct import for jwt-decode

// Initial state
const initialState = {
  user: null, // Store user details here
  token: null,
  refreshToken: null,
  role: null,
  status: "idle",
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/v1/Auth/login", { email, password });
      return response.data.data; // Returns the token data from the response
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for sign-up
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/v1/Auth/register", formData);
      return response.data.data; // Assuming the API returns token data
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to load user from token (on app initialization)
export const loadUserFromToken = createAsyncThunk(
  "auth/loadUserFromToken",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          return rejectWithValue("Token expired");
        } else {
          const role = decodedToken.role;
          const refreshToken = localStorage.getItem("refreshToken") || null;
          const user = {
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name, // Adjust based on your token payload
          };
          return { token, role, refreshToken, user };
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        return rejectWithValue("Invalid token");
      }
    } else {
      return rejectWithValue("No token found");
    }
  }
);

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    resetState: (state) => {
      state.status = "idle";
      state.error = null;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);

        try {
          const decodedToken = jwtDecode(action.payload.token);
          state.role = decodedToken.role;
          state.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name, // Adjust as necessary
          };
        } catch (error) {
          state.role = null;
          state.user = null;
          console.error("Failed to decode token:", error);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);

        try {
          const decodedToken = jwtDecode(action.payload.token);
          state.role = decodedToken.role;
          state.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name,
          };
        } catch (error) {
          state.role = null;
          state.user = null;
          console.error("Failed to decode token:", error);
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Sign-up failed";
      })
      .addCase(loadUserFromToken.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role;
        state.user = action.payload.user;
      })
      .addCase(loadUserFromToken.rejected, (state, action) => {
        state.status = "failed";
        state.token = null;
        state.refreshToken = null;
        state.role = null;
        state.user = null;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logout, resetState } = authSlice.actions;
export default authSlice.reducer;
