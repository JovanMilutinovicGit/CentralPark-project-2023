import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../images/logo-dark.png";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../services/features/authSlice";
import { useLoginMutation } from "../../services/features/authApiSlice";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      dispatch(setCredentials({ ...userData, email }));
      cookies.set("token", userData.data.access_token);
      toast.success("Login success");
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
        toast.error("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
        toast.error("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
        toast.error("Unauthorized");
      } else {
        setErrMsg("Login Failed");
        toast.error("Login Failed");
      }
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);

  return (
    <div className="login">
      <div className="container">
        <div className="row form__div">
          <img src={logo} />
          <form onSubmit={handleSubmit}>
            <div className="title">
              <h4>Sign In</h4>
            </div>
            <div className="email">
              <p>Email</p>
              <input value={email} onChange={handleUserInput} />
            </div>
            <div className="password">
              <p>Password</p>
              <input
                type="password"
                value={password}
                onChange={handlePwdInput}
              />
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
