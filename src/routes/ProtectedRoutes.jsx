import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function ProtectedRoutes() {
  // const token = useSelector((state) => state.user.token);
  const existToken = false;
  return existToken ? <Outlet /> : <Navigate to="/login" />;
}
