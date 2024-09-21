import React from "react";
import './TemperatureToggle.css'; // Import the new CSS file

const TemperatureToggle = ({ unit, setUnit }) => {
  return (
    <div className="temperature-toggle">
      <button
        onClick={() => setUnit("C")}
        className={`temp-button ${unit === "C" ? "active" : ""}`}
      >
        Celsius
      </button>
      <button
        onClick={() => setUnit("F")}
        className={`temp-button ${unit === "F" ? "active" : ""}`}
      >
        Fahrenheit
      </button>
    </div>
  );
};

export default TemperatureToggle;
