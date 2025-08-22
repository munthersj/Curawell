import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ProtectedRoutes from "./ProtectedRoutes";
import LandingPage from "../components/landingPage/LandingPage";
import { Navigate } from "react-router-dom";
import ResetPassword from "../components/auth/ResetPassword";
import MedDeatails from "../components/auth/google/MedDeatails";
import HomePage from "../components/home/HomePage";
import CLinicsPage from "../components/clinics/ClinicsPage";
import HomeCareCos from "../components/clinics/HomeCareCos";
import CosmeticClinicsPage from "../components/clinics/CosmeticClinicsPage";
import ContactUsPage from "../components/ContactUs";
import NotFoundPage from "../components/NotFoundPage";
// import DashBoardPage from "../components/DashBoardPage";
// import { useSelector } from "react-redux";
import Labratory from "../components/clinics/Labratory";
export default function AppRoutes() {
  function NotFound() {
    return (
      <div style={{ padding: 24 }}>
        <h2>404</h2>
      </div>
    );
  }
  function SmartLanding() {
    const token = localStorage.getItem("token");
    return <Navigate to={token ? "/home" : "/landing-page"} replace />;
  }
  function PublicRoutes() {
    const token = localStorage.getItem("token");
    return token ? <Navigate to="/home" replace /> : <Outlet />;
  }
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/googleLogin" element={<MedDeatails />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/contactUsPage" element={<ContactUsPage />} />
      </Route>
      <Route path="/" element={<SmartLanding />} />
      {/* <Route path="/dashboard" element={<DashBoardPage />} /> */}

      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/clinicsPage" element={<CLinicsPage />} />
        <Route
          path="/cosmeticClinic/:serviceId"
          element={<CosmeticClinicsPage />}
        />
        <Route path="/homeCare/:serviceId" element={<HomeCareCos />} />
        <Route path="/labratory" element={<Labratory />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
