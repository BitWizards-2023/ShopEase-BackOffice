// src/features/vendors/vendorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Initial state for vendor slice
const initialState = {
    vendors: [], // Initialize vendors as an array
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // To store error messages
    updateStatus: "idle", // Status for updating a rating
};

// Async thunk for fetching vendors
export const fetchVendors = createAsyncThunk(
    "vendors/fetchVendors",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/VendorRating/admin/list");
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for approving a vendor rating
export const approveRating = createAsyncThunk(
    "vendors/approveRating",
    async (ratingId, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/VendorRating/approve/${ratingId}`);
            return response.data; // Success response
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

// Create vendor slice
const vendorSlice = createSlice({
    name: "vendors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendors.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVendors.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.vendors = action.payload;
            })
            .addCase(fetchVendors.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Failed to fetch vendors";
            })
            // For approveRating
            .addCase(approveRating.pending, (state) => {
                state.updateStatus = "loading";
            })
            .addCase(approveRating.fulfilled, (state, action) => {
                state.updateStatus = "succeeded";
                const ratingId = action.meta.arg; // Get rating ID
                // Find and update the specific rating's status in the state
                state.vendors = state.vendors.map((vendor) =>
                ({
                    ...vendor,
                    ratings: vendor.ratings.map((rating) =>
                        rating.id === ratingId ? { ...rating, isApproved: true } : rating
                    ),
                })
                );
            })
            .addCase(approveRating.rejected, (state, action) => {
                state.updateStatus = "failed";
                state.error = action.payload?.message || "Failed to approve rating";
            });
    },
});

// Export reducer
export default vendorSlice.reducer;
