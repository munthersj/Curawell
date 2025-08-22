import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ProtectedRoutes from "./ProtectedRoutes";
import LandingPage from "../components/landingPage/LandingPage";

import ResetPassword from "../components/auth/ResetPassword";
import MedDeatails from "../components/auth/google/MedDeatails";
import HomePage from "../components/home/HomePage";
import CLinicsPage from "../components/clinics/ClinicsPage";
import NavBar from "../components/NavBar";

import CosmeticClinicsPage from "../components/clinics/CosmeticClinicsPage";
import Profile from "../components/userDashboard/profile";
import AppointmentsPage from "../components/userDashboard/AppointmentsPage";
import DocumentsPage from "../components/userDashboard/DocumentsPage";
import BillsPage from "../components/userDashboard/BillsPage";
import PointsPage from "../components/userDashboard/PointsPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/googleLogin" element={<MedDeatails />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Profile />} />
      <Route path="/appointments" element={<AppointmentsPage />} />
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="/bills" element={<BillsPage />} />
      <Route path="/points" element={<PointsPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/clinicsPage" element={<CLinicsPage />} />
        <Route path="/cosmeticClinic" element={<CosmeticClinicsPage />} />
      </Route>
    </Routes>
  );
}
