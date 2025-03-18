import React from "react";
import { Outlet } from "react-router-dom";
import Logotype from "../../partials/sections/Logotype";

const AuthLayout = () => {
  return (
    <div className="auth-wrapper">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
