import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ProtectedRoutes from "./ProtectedRoutes";
import LandingPage from "../components/landingPage/LandingPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/landing-page" element={<LandingPage/>} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<></>} />
      </Route>
    </Routes>
  );
}
