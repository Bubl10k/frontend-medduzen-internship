import { Route, Routes } from "react-router-dom";
import StartPage from "../pages/StartPage";
import ProfilePage from "../pages/ProfilePage";
import ListUsersPage from "../pages/ListUsersPage";
import CompanyListPage from "../pages/CompanyListPage";
import CompanyProfilePage from "../pages/CompanyProfilePage";
import AboutPage from "../pages/AboutPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<StartPage  />}/>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/users" element={<ListUsersPage />}/>
            <Route path="/companies" element={<CompanyListPage />}/>
            <Route path="/users/:userId" element={<ProfilePage />} />
            <Route path="/companies/:companyId" element={<CompanyProfilePage />} />
        </Routes>
    )
}

export default AppRouter;