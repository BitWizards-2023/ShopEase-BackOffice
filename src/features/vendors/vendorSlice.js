// src/features/vendors/vendorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Initial state for vendor slice
const initialState = {
    vendors: [], // Initialize vendors as an array
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // To store error messages
};

// Async thunk for fetching vendors
export const fetchVendors = createAsyncThunk(
    "vendors/fetchVendors",
    async (_, { rejectWithValue }) => {
        try {
            console.log("Fetching vendors from API..."); // Debug: API call initiated
            const response = await axios.get("/VendorRating/list");
            console.log("Response from API: ", response.data); // Debug: API response
            return Array.isArray(response.data) ? response.data : []; // Ensure the response is an array
        } catch (error) {
            console.error("Error fetching vendors: ", error.response?.data || error); // Debug: API error
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
                console.log("Fetching vendors..."); // Debug: fetching in progress
                state.status = "loading";
            })
            .addCase(fetchVendors.fulfilled, (state, action) => {
                console.log("Vendors fetched successfully:", action.payload); // Debug: fetched data
                state.status = "succeeded";
                state.vendors = action.payload; // Make sure vendors is an array
            })
            .addCase(fetchVendors.rejected, (state, action) => {
                console.error("Failed to fetch vendors:", action.payload); // Debug: fetch failed
                state.status = "failed";
                state.error = action.payload?.message || "Failed to fetch vendors";
            });
    },
});

// Export reducer
export default vendorSlice.reducer;
