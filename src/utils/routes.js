const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    USERS: '/users',
    USER_PROFILE: (userId) => `/users/${userId}`,
    COMPANIES: '/companies',
    COMPANY_PROFILE: (companyId) => `/companies/${companyId}`,
    LOGIN: '/login',
    REGISTER: '/register',
    GITHUB_CALLBACK: '/auth/github/callback',
  };
  
  export default ROUTES;