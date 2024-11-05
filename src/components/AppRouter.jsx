import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './Loading';
import PrivateRoute from '../utils/PrivateRoute';

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
        <Route path="/" element={<PrivateRoute><StartPage /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><AboutPage /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><ListUsersPage /></PrivateRoute>} />
        <Route path="/companies" element={<PrivateRoute><CompanyListPage /></PrivateRoute>} />
        <Route path="/users/:userId" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/companies/:companyId" element={<PrivateRoute><CompanyProfilePage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/auth/github/callback" element={<GitHubCallback />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
