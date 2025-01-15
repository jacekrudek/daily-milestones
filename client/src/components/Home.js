import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.scss";

function Home() {
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const generateDays = () => {
    const days = [];
    const date = new Date();
    const currentYear = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    return days;
  };

  const days = generateDays();

  return (
    <div className="homeContainer">
      <div className="navbar">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
      <div className="calendar">
        {days.map((day) => (
          <div key={day} className="dayTile">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
