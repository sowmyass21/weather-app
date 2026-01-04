import React, { useState } from 'react';
import './App.css';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  }; // <-- close fetchWeather function

  return (
  <div className="container">
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={fetchWeather} className="weather-form">
        <input
          type="text"
          id="cityInput"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button id="searchbtn" type="submit">
          Get Weather
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div id="weatherResult">
        {weather && (
          <>
            <h2>{`${weather.name}, ${weather.main.temp}°C`} 🌡️</h2>
            <p>{`Feels like ${weather.main.feels_like}°C`}</p>
            <p>{`Humidity: ${weather.main.humidity}%`}💧</p>
            <p>{`Wind Speed: ${weather.wind.speed} m/s`}💨</p>
          </>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
