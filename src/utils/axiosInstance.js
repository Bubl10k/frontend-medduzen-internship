import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/auth/auth.slice';
import TokenService from '../services/token.service';
import { jwtDecode } from 'jwt-decode';
import AuthService from '../services/auth.service';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const accessToken = TokenService.getTokens()?.access;

    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime + 60) {
        try {
          await AuthService.updateToken();
          config.headers['Authorization'] = `Bearer ${
            TokenService.getTokens()?.access
          }`;
        } catch (err) {
          store.dispatch(logout());
          throw err;
        }
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
