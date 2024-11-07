import axiosInstance from '../utils/axiosInstance';

const ALL_USERS_URL = 'api/users/users/';

const UserService = {
  async getUsers(page = 1) {
    try {
      const response = await axiosInstance.get(ALL_USERS_URL, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async getUserById(id) {
    try {
      const response = await axiosInstance.get(`${ALL_USERS_URL}${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async deleteUser(id) {
    try {
      const response = await axiosInstance.delete(`${ALL_USERS_URL}${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  async updateUser(user) {
    try {
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        if (key === "image_path" && !(value instanceof File)) return
        formData.append(key, value);
      });
      
      const response = await axiosInstance.put(
        `${ALL_USERS_URL}${user.id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
};

export default UserService;
