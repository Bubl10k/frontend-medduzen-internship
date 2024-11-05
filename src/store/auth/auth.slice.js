import { createSlice } from '@reduxjs/toolkit';

const createInitialState = () => {
  const authTokens = localStorage.getItem('authTokens');
  if (authTokens) {
    return {
      tokens: JSON.parse(authTokens),
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
      state.isAuthenticated = true;
      localStorage.setItem('authTokens', JSON.stringify({ access, refresh }));
    },
    logout: state => {
      state.tokens = { access: null, refresh: null };
      state.isAuthenticated = false;
      localStorage.removeItem('authTokens');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthToken = state => state.auth.tokens;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
