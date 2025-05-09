const TOKEN_KEY = 'authTokens';

const TokenService = {
  getTokens() {
    const tokens = localStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  },

  setTokens(tokens) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  },

  removeTokens() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export default TokenService;
