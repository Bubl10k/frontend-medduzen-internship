import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './Loading';
import PrivateRoute from '../utils/PrivateRoute';
import ROUTES from '../utils/routes';

const StartPage = lazy(() => import('../pages/StartPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const ListUsersPage = lazy(() => import('../pages/ListUsersPage'));
const CompanyListPage = lazy(() => import('../pages/CompanyListPage'));
const CompanyProfilePage = lazy(() => import('../pages/CompanyProfilePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage'));
const GitHubCallback = lazy(() => import('../utils/GitHubCallback'));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
      <Route path={ROUTES.HOME} element={<PrivateRoute><StartPage /></PrivateRoute>} />
        <Route path={ROUTES.ABOUT} element={<PrivateRoute><AboutPage /></PrivateRoute>} />
        <Route path={ROUTES.USERS} element={<PrivateRoute><ListUsersPage /></PrivateRoute>} />
        <Route path={ROUTES.COMPANIES} element={<PrivateRoute><CompanyListPage /></PrivateRoute>} />
        <Route path={ROUTES.USER_PROFILE(':userId')} element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path={ROUTES.COMPANY_PROFILE(':companyId')} element={<PrivateRoute><CompanyProfilePage /></PrivateRoute>} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
        <Route path={ROUTES.GITHUB_CALLBACK} element={<GitHubCallback />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
