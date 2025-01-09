// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRegister.scss"; // Import the SCSS file for styling

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="authBox">
      <div className="footerArea">
        <p>
          Back to <a onClick={handleLoginRedirect}>login</a>
        </p>
      </div>
      <form className="authForm" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            className="inputBox"
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            className="inputBox"
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submitButton">
          Register
        </button>
      </form>
      <div className="titleTextArea">
        <p className="line1">It is a good time</p>
        <p className="line2">to start!</p>
      </div>
    </div>
  );
}

export default Register;
