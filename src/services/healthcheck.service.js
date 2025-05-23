import axiosInstance from '../utils/axiosInstance';

const healthCheck = async () => {
  try {
    const response = await axiosInstance.get('api/healthcheck');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default healthCheck;
