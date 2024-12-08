import axiosInstance from '../utils/axiosInstance';

const NOTIFICATION_URL = '/api/notification/notifications/';

const NotificationService = {
  async getNotifications() {
    try {
      const response = await axiosInstance.get(`${NOTIFICATION_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  async markAsRead(notificationId) {
    try {
      const response = await axiosInstance.patch(
        `${NOTIFICATION_URL}${notificationId}/mark-read/`,
      );
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },
};

export default NotificationService;
