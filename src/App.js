// src/App.js
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import WeatherInfo from './components/WeatherInfo';
import UserLocationWeather from './components/UserLocationWeather';
import axios from 'axios';
import './App.css';

const API_KEY = '1fb9b7430ade9dc72614f3f70d323ea3'; // Replace with your OpenWeather API key

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [tempUnit, setTempUnit] = useState('celsius'); // State to hold temperature unit

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  const handleTempUnitChange = (unit) => {
    setTempUnit(unit);
  };

  return (
    <div className="App">
      <Navbar initialWeatherData={weatherData} onCitySelect={handleWeatherData} onTempUnitChange={handleTempUnitChange} />
      <UserLocationWeather weatherData={weatherData} tempUnit={tempUnit} />
      {weatherData && <WeatherInfo weatherData={weatherData} tempUnit={tempUnit} />}
      
    </div>
  );
}

export default App;
