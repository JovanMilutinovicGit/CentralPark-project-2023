import React, { useState } from "react";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddNew from "./Pages/AddNew/AddNew.js";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";

const App = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="app">
      {/*<Login />*/}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/addNew" element={<AddNew />} />

            <Route path="/dashboard" index element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
