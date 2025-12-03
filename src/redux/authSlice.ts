import { createSlice } from '@reduxjs/toolkit';

interface User {
  uid?: string;
  nickname?: string;
  name?: string;
  picture?: string;
  email?: string;
  emailVerified?: boolean;
  creationTime?: string;
  lastSignInTime?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  provider: 'auth0' | 'firebase' | null;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  provider: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.provider = action.payload.provider;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.provider = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
