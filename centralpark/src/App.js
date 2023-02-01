import React from "react";
import Login from "./Pages/Login/Login";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AddNew from "./Pages/AddNew/AddNew.js";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import AuthWrapper from "./Components/AuthWrapperRoutes/AuthWrapper";

const App = () => {
  return (
    <div className="app">
      {/* <Login /> */}
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/addNew" />} exact />
            <Route
              path="/addNew"
              element={
                <AuthWrapper>
                  <AddNew />
                </AuthWrapper>
              }
              exact
            />
            <Route
              path="/dashboard"
              element={
                <AuthWrapper>
                  <Dashboard />
                </AuthWrapper>
              }
              exact
            />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
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
