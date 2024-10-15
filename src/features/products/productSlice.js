import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Async thunk to upload image file with Authorization token
export const uploadImage = createAsyncThunk(
    'product/uploadImage',
    async (file, { rejectWithValue }) => {
        try {
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

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/v1/products');
            return response.data.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch product details by ID
export const fetchProductById = createAsyncThunk(
    'product/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/v1/products/${id}`);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to create a new product
export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/v1/products', productData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

// Async thunk to update a product
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, updatedProduct }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/v1/products/${id}`, updatedProduct, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data; // Return the updated product
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);


// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/v1/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

// Async thunk to activate a product
export const activateProduct = createAsyncThunk(
    'product/activateProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/v1/products/${id}/activate`, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

// Async thunk to deactivate a product
export const deactivateProduct = createAsyncThunk(
    'product/deactivateProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/v1/products/${id}/deactivate`, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
        imageUrl: null, // Initialize with null
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

            // Handle fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload; // Store the fetched products
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle fetch product by ID
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // You can implement the logic to store or manipulate single product data if needed
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle add product
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload); // Add the new product
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.products.findIndex((product) => product.id === action.meta.arg.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.filter(
                    (product) => product.id !== action.meta.arg
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle activate product
            .addCase(activateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const product = state.products.find((prod) => prod.id === action.meta.arg);
                if (product) {
                    product.isActive = true;
                }
            })
            .addCase(activateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle deactivate product
            .addCase(deactivateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const product = state.products.find((prod) => prod.id === action.meta.arg);
                if (product) {
                    product.isActive = false;
                }
            })
            .addCase(deactivateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
