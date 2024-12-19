import axiosInstance from '../utils/axiosInstance';
import { store } from '../store/store';
import { login, logout } from '../store/auth/auth.slice';
import TokenService from './token.service';

const LOGIN_URL = '/auth/jwt/create/';
const REFRESH_URL = '/auth/jwt/refresh/';
const REGISTER_URL = 'api/users/users/';
const GITHUB_CALLBACK_URL = '/api/users/auth/github';
const GITHUB_LOGIN_URL = 'api/users/github/';

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
        const tokens = { ...auth, access: response.data.access };
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
      await axiosInstance.post(REGISTER_URL, credentials);
      await this.login({
        username: credentials.username,
        password: credentials.password,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  githubLogin() {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_GITHUB_CLIENT_ID
    }&amp;redirect_uri=${import.meta.env.VITE_GITHUB_REDIRECT_URI}&amp;scope=user`;
    window.location.href = githubAuthUrl;
  },
  async handleGitHubCallback(code) {
    try {
      const token = await axiosInstance.post(GITHUB_CALLBACK_URL, {
        code,
      });
      const response = await axiosInstance.post(GITHUB_LOGIN_URL, {
        access_token: token.data.access_token,
      });
      const { refresh, access } = response.data;
      TokenService.setTokens({ refresh, access });
      store.dispatch(login({ refresh, access }));
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

export default AuthService;
