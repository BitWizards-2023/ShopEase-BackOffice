import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { jwtDecode } from "jwt-decode";

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const decodedToken = jwtDecode(token);
      const { role, vendorId } = decodedToken;

      let endpoint = "/v1/orders";
      if (role === "Vendor") {
        endpoint += `/vendor`;
      }

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
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

// Async thunk to update the order item
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

// Async thunk to cancel an order (DELETE request)
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/v1/orders/${orderId}`, {
        data: { reason }, // Pass reason for cancellation in request body
        headers: {
          Authorization: `Bearer ${token}`,
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

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
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
      })
      // Handle cancel order (DELETE request)
      .addCase(cancelOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
