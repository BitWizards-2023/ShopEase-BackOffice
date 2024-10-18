import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/products/productSlice";
import userReducer from "../features/users/userSlice";
import orderReducer from "../features/orders/orderSlice";
import userProfileReducer from "../features/userProfile/userProfileSlice";
import vendorReducer from "../features/vendors/vendorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    products: productReducer,
    users: userReducer,
    orders: orderReducer,
    userProfile: userProfileReducer,
    vendors: vendorReducer,
  },
});

export default store;
