import React, { useState, useEffect, lazy, Suspense } from "react";
import SearchBar from "./components/SearchBar";
import TemperatureToggle from "./components/TemperatureToggle";
import './App.css'; // Import the new CSS file
import NotFound from "./components/NotFound";
import PullToRefresh from 'react-pull-to-refresh';

const WeatherCard = lazy(() => import("./components/WeatherCard"));
const ForecastCard = lazy(() => import("./components/ForecastCard"));

const App = () => {
  const [city, setCity] = useState("New York");
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState("C");
  const [notFound, setNotFound] = useState(false); // State to track not found city

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (city) => {
    const cachedData = JSON.parse(localStorage.getItem(city));
    if (cachedData) {
      setWeatherData(cachedData.weatherData);
      setForecast(cachedData.forecast);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API}&units=metric`
      );

      if (response.status === 404) {
        setNotFound(true);
        setWeatherData(null); // Clear previous weather data
        setForecast([]);
        return;
      }

      const data = await response.json();
      setWeatherData(data);
      setNotFound(false); // Reset not found state if the city exists

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API}&units=metric`
      );
      const forecastData = await forecastResponse.json();

      const nextFiveDays = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      ).slice(0, 5); // Get the first 5 unique days

      setForecast(nextFiveDays);
      localStorage.setItem(city, JSON.stringify({
        weatherData: data,
        forecast: nextFiveDays
      }));
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleRefresh = () => {
    fetchWeather(city); // Call your fetchWeather function
  };

  const filteredForecast = forecast.filter((item) => {
    return item.dt_txt.includes("12:00:00"); // Only take the forecast at noon (12:00:00)
  });

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="app-container">
        <div className="content-container">
          <h1 className="title">Weather Forecast</h1>
          <SearchBar setCity={setCity} />

          {notFound ? (
            <NotFound /> // Render NotFound component when the city is not found
          ) : (
            weatherData && (
              <>
                <Suspense fallback={<div>Loading...</div>}>
                  <WeatherCard
                    city={weatherData.name}
                    temp={weatherData.main.temp}
                    condition={weatherData.weather[0].main}
                    icon={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                    unit={unit}
                  />
                  <TemperatureToggle unit={unit} setUnit={setUnit} />
                  <div className="forecast-grid">
                    {filteredForecast.map((day, index) => (
                      <ForecastCard
                        key={index}
                        day={new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
                        high={day.main.temp_max}
                        low={day.main.temp_min}
                        icon={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                        unit={unit}
                      />
                    ))}
                  </div>
                </Suspense>
              </>
            )
          )}
        </div>
      </div>
    </PullToRefresh>
  );
};

export default App;
