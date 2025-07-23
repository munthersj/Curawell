/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
export default function ProtectedRoutes() {
  // const token = useSelector((state) => state.user.token);
  const token = localStorage.getItem("token");
  console.log(token + " is here");
  const existToken = token == "undefined" ? false : true;
  return existToken ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
