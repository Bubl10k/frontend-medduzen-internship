import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

const createInitialState = () => {
  const authTokens = localStorage.getItem('authTokens');
  if (authTokens) {
    const tokens = JSON.parse(authTokens);
    const decodedToken = jwtDecode(tokens.access);

    return {
      tokens,
      currentUserId: decodedToken.user_id,
      isAuthenticated: true,
    };
  } else {
    return {
      tokens: {
        access: null,
        refresh: null,
      },
      isAuthenticated: false,
    };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: createInitialState(),
  reducers: {
    login: (state, action) => {
      const { access, refresh } = action.payload;
      state.tokens = { access, refresh };
      state.currentUserId = jwtDecode(access).user_id;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.tokens = { access: null, refresh: null };
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const currentUser = (state) => state.auth.currentUserId;
export const selectAuthToken = state => state.auth.tokens;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
