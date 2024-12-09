import { createSlice } from '@reduxjs/toolkit';
import { fetchNotifications, markAsRead } from './notifications.actions';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.filter(
          notification => notification.status === 'Unread',
        );
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.filter(
          notification => notification.id !== action.payload.id,
        );
      });
  },
});

export default notificationSlice.reducer;
export const selectNotificationsState = state => state.notifications;
