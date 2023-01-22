import React from "react";
import "./Login.css";
import logo from "../../images/logo-dark.png";

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <div className="row form__div">
          <img src={logo} />

          <form>
            <div className="title">
              <h4>Sign In</h4>
            </div>
            <div className="email">
              <p>Email</p>
              <input />
            </div>
            <div className="password">
              <p>Password</p>
              <input />
            </div>
            <div className="btn">
              <button>Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
