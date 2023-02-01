import React from "react";
import "./Logout.css";
import { useSendLogoutMutation } from "../../../services/features/authApiSlice";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const cookies = new Cookies();
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        sendLogout();
        cookies.remove("token");
        navigate("/login");
      }}
      className="logout_btn"
    >
      Logout
    </button>
  );
};

export default Logout;
