import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { jwtDecode } from "jwt-decode";

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      // Decode the token to get user information
      const decodedToken = jwtDecode(token);
      const { role, vendorId } = decodedToken; // Assuming the token has userRole and vendorId

      // Determine the endpoint based on the user role
      let endpoint = "/v1/orders";
      if (role === "Vendor") {
        endpoint += `/vendor`; // For vendor, use the vendor-specific endpoint
      }

      // Fetch orders with authorization header
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data; // Adjust this if the API structure is different
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update the order item (status and tracking number)
export const updateOrderItem = createAsyncThunk(
  "orders/updateOrderItem",
  async ({ orderId, itemId, status, trackingNumber }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/v1/orders/${orderId}/items/${itemId}`,
        { status, trackingNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; // Store the fetched orders
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle update order item (PUT request)
      .addCase(updateOrderItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderItem.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateOrderItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
