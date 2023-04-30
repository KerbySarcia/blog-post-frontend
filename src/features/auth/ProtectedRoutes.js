import React from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { roles } = useAuth();
  const location = useLocation();
  console.log(2);
  const content = roles?.length ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
  return content;
};

export default ProtectedRoutes;
