import axiosInstance from '../utils/axiosInstance';
import { store } from '../store/store';
import { login, logout } from '../store/auth/auth.slice';
import TokenService from './token.service';

const LOGIN_URL = '/auth/jwt/create/';
const REFRESH_URL = '/auth/jwt/refresh/';
const REGISTER_URL = 'api/users/users/';
const GITHUB_LOGIN_URL = '/auth/social/login/github/';

const AuthService = {
  async login(credentials) {
    try {
      const response = await axiosInstance.post(LOGIN_URL, credentials);
      const { refresh, access } = response.data;
      TokenService.setTokens({ refresh, access });
      store.dispatch(login({ refresh, access }));
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async logout() {
    store.dispatch(logout());
    TokenService.removeTokens();
  },

  async updateToken() {
    try {
      const auth = TokenService.getTokens();
      const response = await axiosInstance.post(REFRESH_URL, {
        refresh: auth?.refresh,
      });
      if (response.status === 200) {
        const tokens = { ...auth, access: response.data.access }
        TokenService.setTokens(tokens);
        store.dispatch(login({ tokens }));
        return tokens.access;
      } else {
        this.logout();
      }
    } catch (err) {
      console.error('Token refresh failed', err);
      this.logout();
      throw err;
    }
  },

  async register(credentials) {
    try {
      const response = await axiosInstance.post(REGISTER_URL, credentials);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async githubLogin() {
    window.location.href = process.env.VITE_API_URL + GITHUB_LOGIN_URL;
  },

  handleGitHubCallback(authToken) {
    TokenService.setTokens(authToken);
    store.dispatch(login(authToken));
  },
};

export default AuthService;
