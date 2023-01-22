import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";
import PanelTop from "../Panels/PanelTop/PanelTop";
import PanelBottom from "../Panels/PanelBottom/PanelBottom";

const Layout = () => {
  const [selVal, setSelVal] = useState("Add new");

  const getValue = (value) => {
    setSelVal(value);
  };

  return (
    <div className="layout">
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
