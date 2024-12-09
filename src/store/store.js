import { configureStore } from '@reduxjs/toolkit';
import textReducer from './text/text.slice.js';
import authReducer from './auth/auth.slice.js';
import userReducer from './users/users.slice.js';
import companiesReducer from './companies/companies.slice.js';
import quizzesReducer from './quizzes/quizzes.slice.js';
import socketMiddleware from '../middleware/socketMiddleware.js';
import WebSocketService from '../services/websocket.service.js';
import notificationsReducer from './notifications/notifications.slice.js';

export const store = configureStore({
  reducer: {
    text: textReducer,
    auth: authReducer,
    users: userReducer,
    companies: companiesReducer,
    quizzes: quizzesReducer,
    notifications: notificationsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(socketMiddleware(new WebSocketService())),
});
