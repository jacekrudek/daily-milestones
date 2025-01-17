import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.scss";

function Home() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [tickedItems, setTickedItems] = useState({});
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("/api/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleSettingsRedirect = () => {
    //navigate("/settings");
  };

  const handleRemoveGoal = () => {
    //navigate("/settings");
  };

  const handleAddGoal = () => {
    //navigate("/settings");
  };

  const generateDays = () => {
    const days = [];
    const date = new Date();
    const currentYear = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        strings: [`10 push ups`, `Wake up at 8am`, `No phone 1hr before bed`], // Example strings
      });
    }
    return days;
  };

  const days = generateDays();

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleClosePopup = () => {
    setSelectedDay(null);
  };

  const getMonthName = (monthIndex) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  };

  const handleTickItem = (day, index) => {
    setTickedItems((prev) => ({
      ...prev,
      [day.day]: {
        ...prev[day.day],
        [index]: !prev[day.day]?.[index],
      },
    }));
  };

  const getTileClass = (day) => {
    const ticked = tickedItems[day.day] || {};
    const totalItems = day.strings.length;
    const tickedCount = Object.values(ticked).filter(Boolean).length;
    const percentage = (tickedCount / totalItems) * 100;

    if (percentage === 100) {
      return "dayTile green";
    } else if (percentage > 50) {
      return "dayTile orange";
    } else {
      return "dayTile";
    }
  };

  const currentMonth = getMonthName(new Date().getMonth());
  const currentYear = new Date().getFullYear();

  return (
    <div className="homeContainer">
      <div className="header">
        <h1>
          {currentMonth} {currentYear}
        </h1>
      </div>
      <div className="pageCenter">
        <div className="navbar">
          <ul>
            <li onClick={handleAddGoal}>
              <p>Add goal</p>
            </li>
            <li onClick={handleRemoveGoal}>
              <p>Remove goal</p>
            </li>
            <li onClick={handleSettingsRedirect}>
              <p>Settings</p>
            </li>
            <li onClick={handleLogout}>
              <p>Logout</p>
            </li>
          </ul>
        </div>
        <div className="calendar">
          {days.map((dayObj) => (
            <div
              key={dayObj.day}
              className={getTileClass(dayObj)}
              onClick={() => handleDayClick(dayObj)}
            >
              {dayObj.day}
            </div>
          ))}
          {selectedDay && (
            <div className="popup">
              <span className="close" onClick={handleClosePopup}>
                &times;
              </span>
              <div className="popupContent">
                <h2 className="popupHeader">
                  Goals for {currentMonth} {selectedDay.day}, {currentYear}
                </h2>
                <ul className="goalList">
                  {selectedDay.strings.map((str, index) => (
                    <li key={index} className="goal">
                      <button
                        onClick={() => handleTickItem(selectedDay, index)}
                        className={`tickButton`}
                      >
                        {tickedItems[selectedDay.day]?.[index] ? "✓" : "✗"}
                      </button>
                      {str}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
