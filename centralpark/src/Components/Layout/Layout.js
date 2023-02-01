import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";
import PanelTop from "../Panels/PanelTop/PanelTop";
import PanelBottom from "../Panels/PanelBottom/PanelBottom";
import EditModal from "../EditModal/EditModal";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentState } from "../../services/features/EditModalSlice";
import Cookies from "universal-cookie";
import { closeModal } from "../../services/features/EditModalSlice";
import { selectCurrentToken } from "../../services/features/authSlice";

const Layout = () => {
  const [selVal, setSelVal] = useState("Add new");
  const stateModal = useSelector(selectCurrentState);

  const getValue = (value) => {
    setSelVal(value);
  };

  return (
    <div className="layout">
      {stateModal && (
        <div className="modal_parent">
          <EditModal />
        </div>
      )}
      <div className="sidebarr">
        <Navbar func={getValue} />
      </div>
      <div className="otl">
        <PanelTop val={selVal} />
        <Outlet />
        <PanelBottom />
      </div>
    </div>
  );
};

export default Layout;
