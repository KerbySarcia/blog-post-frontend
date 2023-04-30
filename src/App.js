import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./features/posts/Home";
import Login from "./features/auth/Login";
import ProtectedRoutes from "./features/auth/ProtectedRoutes";
import PersistLogin from "./features/auth/PersistLogin";
import CreateAccount from "./features/users/CreateAccount";

function App() {
  return (
    <div className=" ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="create" element={<CreateAccount />} />
          <Route element={<PersistLogin />}>
            <Route element={<ProtectedRoutes />}>
              <Route index element={<Home />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
