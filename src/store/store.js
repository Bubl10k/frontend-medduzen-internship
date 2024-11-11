import { configureStore } from '@reduxjs/toolkit';
import textReducer from './text/text.slice.js';
import authReducer from './auth/auth.slice.js';
import userReducer from './users/users.slice.js';

export const store = configureStore({
  reducer: {
    text: textReducer,
    auth: authReducer,
    users: userReducer,
  },
});
