import React from "react";
import './ForecastCard.css'; // Import the new CSS file

const ForecastCard = ({ day, high, low, icon, unit }) => {
  const highTemp = unit === "C" ? high : (high * 9/5) + 32;
  const lowTemp = unit === "C" ? low : (low * 9/5) + 32;

  return (
    <div className="forecast-card">
      <h3 className="forecast-day">{day}</h3>
      <img src={icon} alt="weather icon" className="forecast-icon" />
      <p>High: {highTemp.toFixed(1)}°{unit}</p>
      <p>Low: {lowTemp.toFixed(1)}°{unit}</p>
    </div>
  );
};

export default ForecastCard;
