import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const state = store.getState();
    const accessToken = state.auth.tokens?.access;

    if (accessToken && !config.url.includes('register')) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

export default axiosInstance;
