import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification, NotificationsState } from '../../types';

const initialState: NotificationsState = {
  list: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.list.unshift(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.list.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.list.forEach(notification => {
        notification.isRead = true;
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(n => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.list = [];
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.list = action.payload;
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
  setNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;

