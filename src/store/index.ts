import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobsReducer from './slices/jobsSlice';
import notificationsReducer from './slices/notificationsSlice';
import chatReducer from './slices/chatSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    notifications: notificationsReducer,
    chat: chatReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
