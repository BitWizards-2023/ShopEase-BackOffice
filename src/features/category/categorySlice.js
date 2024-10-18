import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';


// Async thunk to upload image file with Authorization token
export const uploadImage = createAsyncThunk(
    'category/uploadImage',
    async (file, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('/v1/Blob/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data; // Returns the file URL and blob name
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/Category');
            return response.data.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch a category by its ID
export const fetchCategoryById = createAsyncThunk(
    'category/fetchCategoryById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/Category/${id}`);
            return response.data.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to update a category
export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async ({ id, name, isActive, imageUrl }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `/Category/${id}`,
                { name, isActive, imageUrl },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
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

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Deleting category with ID: ${id}`); // Log the ID
            const response = await axios.delete(`/Category/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log("Category deleted:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error deleting category:", error); // Log the error
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);


// Async thunk for adding a new category with Authorization token
export const addCategory = createAsyncThunk(
    'category/addCategory',
    async ({ name, isActive, imageUrl }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            console.log("Sending category data to backend:", { name, isActive, imageUrl }); // Log the data being sent
            const response = await axios.post(
                '/Category',
                {
                    name,
                    isActive,
                    imageUrl,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Attach token in Authorization header
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

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],  // Ensure this is an array
        status: 'idle',
        error: null,
        imageUrl: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle image upload
            .addCase(uploadImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.imageUrl = action.payload.fileUrl; // Store the image URL
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle category creation
            .addCase(addCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.log(state.error);
            })

            // Handle fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload; // Store the fetched categories
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle delete category
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                    (category) => category.id !== action.meta.arg
                );
                state.status = 'succeeded';
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle update category
            .addCase(updateCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Find the category index and update it
                const index = state.categories.findIndex((category) => category.id === action.meta.arg.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })

            .addCase(updateCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
        
            // Handle fetching category by ID
            .addCase(fetchCategoryById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categoryById[action.meta.arg] = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export actions and thunks
export default categorySlice.reducer;
