import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [], // Array to hold notification objects
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action) {
      // Add new notification to the beginning of the array
      state.notifications.unshift(action.payload);
    },
    markAsRead(state, action) {
      const index = state.notifications.findIndex(
        (notif) => notif.id === action.payload
      );
      if (index !== -1) {
        state.notifications[index].read = true;
      }
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const {
  addNotification,
  markAsRead,
  removeNotification,
  clearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
