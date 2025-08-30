/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function ProtectedRoutes2() {
  // const token = useSelector((state) => state.user.token);
  const token = localStorage.getItem("token");
  console.log(token + " is here");
  const existToken = !token ? false : true;
  return existToken ? (
    <>
      {/* <NavBar /> */}
      <Outlet />
      {/* <CurwellFooter /> */}
    </>
  ) : (
    <Navigate to="/login" />
  );
}
