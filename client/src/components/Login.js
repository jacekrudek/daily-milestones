// src/components/Login.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRegister.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="authBox">
      <div className="footerArea">
        <p>Don't have an account?</p>
        <p>
          Not to worry! Join the dream-chasers{" "}
          <a onClick={handleRegisterRedirect}>here</a>
        </p>
      </div>
      <form className="authForm" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            className="inputBox"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            className="inputBox"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submitButton" type="submit">
          Login
        </button>
      </form>
      <div className="titleTextArea">
        <p className="line1">Time to pursue your</p>
        <p className="line2">goals!</p>
      </div>
    </div>
  );
}

export default Login;
