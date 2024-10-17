import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

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
export const signupUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/v1/Auth/login", { email, password });
      const tokenData = response.data.data;

      // Decode the token and fetch user details
      const decodedToken = jwtDecode(tokenData.token);

      // Dispatch fetchUserDetails after login
      await dispatch(fetchUserDetails({ token: tokenData.token }));

      return {
        token: tokenData.token,
        refreshToken: tokenData.refreshToken,
        role: decodedToken.role,
      };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

// Async thunk to fetch user details from the /Auth/me endpoint
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await api.get("/v1/Auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data; // Return user data
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

// Async thunk to load user from token (on app initialization)
export const loadUserFromToken = createAsyncThunk(
  "auth/loadUserFromToken",
  async (_, { dispatch, rejectWithValue }) => {
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
          const refreshToken = localStorage.getItem("refreshToken") || null;

          // Fetch user details with token
          await dispatch(fetchUserDetails({ token }));

          return {
            token,
            refreshToken,
            role: decodedToken.role,
          };
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
      // Handling loginUser thunk
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role;

        // Store token in localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      })

      // Handling fetchUserDetails thunk
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Store the user details
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch user details";
      })

      // Handling loadUserFromToken thunk
      .addCase(loadUserFromToken.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role;
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
