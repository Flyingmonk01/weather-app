import React from "react";
import './WeatherCard.css'; // Import the new CSS file

const WeatherCard = ({ city, temp, condition, icon, unit }) => {
  const temperature = unit === "C" ? temp : (temp * 9 / 5) + 32;

  return (
    <div className="weather-card">
      <h2 className="city">{city}</h2>
      <p className="condition">{condition}</p>
      <img src={icon} alt={condition} className="weather-icon" />
      <p className="temperature">
        {temperature.toFixed(1)}°{unit}
      </p>
    </div>
  );
};

export default WeatherCard;
