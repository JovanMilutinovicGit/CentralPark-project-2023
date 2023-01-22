import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <form>
              <input placeholder="Broker company" />
              <input placeholder="Client company" />
              <input type="date" />
              <input type="date" />
              <button className="filter_btn">
                <i class="fa fa-filter" aria-hidden="true"></i>
              </button>
              <button className="reset_btn">Reset</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
