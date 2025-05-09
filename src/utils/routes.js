const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    USERS: '/users',
    USER_PROFILE: (userId) => `/users/${userId}`,
    COMPANIES: '/companies',
    COMPANY_PROFILE: (companyId) => `/companies/${companyId}`,
    LOGIN: '/login',
    REGISTER: '/register',
    GITHUB_CALLBACK: '/callback',
    INVITATIONS_USER: '/user-invitations',
    REQUESTS_USER: '/user-requests',
    INVITATIONS_COMPANY: '/company-invitations',
    REQUESTS_COMPANY: (companyId) => `/company-requests/${companyId}`,
    QUIZZES: (companyId) => `/quizzes/${companyId}`,
    QUIZ: (quizId) => `/quiz/${quizId}`,
    NOTIFICATIONS: '/notifications',
  };
  
  export default ROUTES;