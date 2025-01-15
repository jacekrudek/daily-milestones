// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRegister.scss"; // Import the SCSS file for styling

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setShowPopup(false);
    // Handle login logic here
    console.log(email, password);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setShowPopup(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
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
      {showPopup && (
        <div className="register popup">
          <div className="registerPopupContent">
            <h2>Registration Successful</h2>
            <button onClick={handleLoginRedirect} className="submitButton">
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
