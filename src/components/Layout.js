import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="bg-slate-300">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
