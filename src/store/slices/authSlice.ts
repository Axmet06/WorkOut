import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '../../types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoggingIn: false,
  isRegistering: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoggingIn = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoggingIn = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggingIn = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.isRegistering = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.isRegistering = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isRegistering = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  registerStart, 
  registerSuccess, 
  registerFailure, 
  logout, 
  clearError, 
  updateUser 
} = authSlice.actions;
export default authSlice.reducer;
