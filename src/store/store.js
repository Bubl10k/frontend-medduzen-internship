import { configureStore } from '@reduxjs/toolkit';
import textReducer from './text/text.slice.js';

export const store = configureStore({
  reducer: {
    text: textReducer,
  },
});
