import axiosInstance from '../utils/axiosInstance';
import { store } from '../store/store';
import { login, logout } from '../store/auth/auth.slice';

const LOGIN_URL = `/auth/jwt/create`;

const AuthService = {
  async login(credentials) {
    try {
      const response = await axiosInstance.post(LOGIN_URL, credentials);
      const { refresh, access } = response.data;
      localStorage.setItem('authTokens', JSON.stringify({ refresh, access }));
      store.dispatch(login({ refresh, access }));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async logout() {
    store.dispatch(logout());
  },

  async updateToken() {
    const { auth } = store.getState();
    const response = await axiosInstance.post(
      '/auth/jwt/refresh/',
      auth?.refresh,
    );
    if (response.status === 200) {
      const { tokens } = response.data;
      store.dispatch(login({ tokens }));
      return tokens.access;
    } else {
      logout();
    }
  },

  async register(credentials) {
    try {
      const response = await axiosInstance.post(
        'api_users/users/',
        credentials,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async githubLogin() {
    window.location.href = `${
      import.meta.env.VITE_API_URL
    }/auth/social/login/github/`;
  },

  handleGitHubCallback(authToken) {
    localStorage.setItem('authTokens', JSON.stringify(authToken));
    store.dispatch(login(authToken));
  },
};

export default AuthService;
