import React from "react";
import Logout from "../../buttons/LogOutBtn/Logout";
import "./PanelTop.css";

const PanelTop = ({ val }) => {
  return (
    <div className="panel__top">
      <div className="container-fluid">
        <div className="row">
          <div className="panel_left">
            <h4>Visits</h4>
            <span>|</span>
            <h6>{val}</h6>
          </div>
          <div className="panel_right">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelTop;
