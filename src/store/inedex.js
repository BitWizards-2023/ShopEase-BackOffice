import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/products/productSlice";
import userReducer from "../features/users/userSlice";
import notificationsReducer from "../features/notification/notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    products: productReducer,
    users: userReducer,
    notifications: notificationsReducer,
  },
});

export default store;
