import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ProtectedRoutes from "./ProtectedRoutes";
import ResetPassword from "../components/ResetPassword";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<></>} />
      </Route>
    </Routes>
  );
}
