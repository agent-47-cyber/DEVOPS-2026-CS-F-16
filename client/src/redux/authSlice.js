import { createSlice } from '@reduxjs/toolkit';

// Retrieve initial token & user from localStorage if available
const storedToken = typeof window !== 'undefined' ? localStorage.getItem('portfolio_admin_token') : null;
let storedUser = null;

try {
  const userJson = typeof window !== 'undefined' ? localStorage.getItem('portfolio_admin_user') : null;
  if (userJson) {
    storedUser = JSON.parse(userJson);
  }
} catch {
  storedUser = null;
}

const initialState = {
  token: storedToken || null,
  user: storedUser || null,
  isAuthenticated: Boolean(storedToken),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;

      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio_admin_token', action.payload.token);
        if (action.payload.user) {
          localStorage.setItem('portfolio_admin_user', JSON.stringify(action.payload.user));
        }
      }
    },
    loginFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = action.payload;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('portfolio_admin_token');
        localStorage.removeItem('portfolio_admin_user');
      }
    },
    logout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('portfolio_admin_token');
        localStorage.removeItem('portfolio_admin_user');
      }
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
