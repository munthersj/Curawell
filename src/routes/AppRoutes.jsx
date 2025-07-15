import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ProtectedRoutes from "./ProtectedRoutes";
import LandingPage from "../components/landingPage/LandingPage";

import ResetPassword from "../components/auth/ResetPassword";
import MedDeatails from "../components/auth/google/MedDeatails";
import HomePage from "../components/home/HomePage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/landing-page" element={<LandingPage/>} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/googleLogin" element={<MedDeatails />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
