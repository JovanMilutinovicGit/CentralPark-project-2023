import React from "react";
import "./Logout.css";
import { useSendLogoutMutation } from "../../../services/features/authApiSlice";
import Cookies from "universal-cookie";
import { redirect } from "react-router-dom";

const Logout = () => {
  const cookies = new Cookies();
  const [sendLogout, { isLoading }] = useSendLogoutMutation();

  return (
    <button
      onClick={() => {
        sendLogout();
        cookies.remove("token");
        redirect("/login");
      }}
      className="logout_btn"
    >
      Logout
    </button>
  );
};

export default Logout;
