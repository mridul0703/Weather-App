// src/components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import './Search.css'; // Create and import a CSS file for custom styles

const API_KEY = '1fb9b7430ade9dc72614f3f70d323ea3'; // Replace with your OpenWeather API key

const Search = ({ onCitySelect }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (value) => {
    if (value.trim().length > 2) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  const onChange = (event) => {
    setValue(event.target.value);
    getSuggestions(event.target.value);
  };

  const handleCitySelect = async (city) => {
    const weatherData = await fetchWeatherData(city.lat, city.lon);
    onCitySelect({ ...city, weather: weatherData });
    setValue('');
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type a city name..."
        className="search-input"
      />
      <ul className="suggestions-list">
        {suggestions.map((city) => (
          <li key={city.lat + city.lon} onClick={() => handleCitySelect(city)} className="suggestion-item">
            {city.name}, {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
