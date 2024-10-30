import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./Loading";

const StartPage = lazy(() => import("../pages/StartPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const ListUsersPage = lazy(() => import("../pages/ListUsersPage"));
const CompanyListPage = lazy(() => import("../pages/CompanyListPage"));
const CompanyProfilePage = lazy(() => import("../pages/CompanyProfilePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/users" element={<ListUsersPage />} />
        <Route path="/companies" element={<CompanyListPage />} />
        <Route path="/users/:userId" element={<ProfilePage />} />
        <Route path="/companies/:companyId" element={<CompanyProfilePage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
