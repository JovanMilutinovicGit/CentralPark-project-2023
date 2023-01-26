import React from "react";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddNew from "./Pages/AddNew/AddNew.js";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";

const App = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return (
    <div className="app">
      {/*<Login />*/}
      <Router>
        {token ? (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/addNew" element={<AddNew />} />
              <Route path="/dashboard" index element={<Dashboard />} />
            </Route>
          </Routes>
        ) : (
          <Login />
        )}
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
