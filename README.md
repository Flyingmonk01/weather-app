# Weather Forecast Application

A simple weather forecast application built with React. Users can search for cities to view current weather conditions and a 5-day forecast. The app includes features for caching city data for offline viewing and pull-to-refresh functionality to update weather data.

## Features

- **City Search**: Search for cities and view current weather conditions.
- **5-Day Forecast**: Get weather forecasts for the next five days.
- **Caching**: Last searched city and its weather data are cached for offline viewing.
- **Pull-to-Refresh**: Update weather data by pulling down the interface.
- **Temperature Toggle**: Switch between Celsius and Fahrenheit.
- **Responsive Design**: Mobile-friendly layout.

## Technologies Used

- React
- OpenWeatherMap API
- CSS for styling
- Lazy loading for performance optimization

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-forecast-app.git
   cd weather-forecast-app


## Install dependencies:
npm install


## Create a .env file in the root directory and add your OpenWeatherMap API key:
REACT_APP_API=your_api_key_here

## Start the application:
npm start


Open your browser and navigate to http://localhost:3000.

## Usage
- Enter a city name in the search bar to fetch weather data.
- Click on a city in the dropdown to view its weather conditions and forecast.
- Use the temperature toggle to switch between Celsius and Fahrenheit.
- Pull down to refresh the weather data.


## Components
- App: Main component managing state and fetching weather data.
- SearchBar: Component for searching cities.
- WeatherCard: Displays current weather conditions.
- ForecastCard: Displays forecast data for each day.
- TemperatureToggle: Allows switching between Celsius and Fahrenheit.
- NotFound: Displays a message when a city is not found.