import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AuthWrapper = ({ children }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return !token ? <Navigate to="/login" /> : children;
};

export default AuthWrapper;
