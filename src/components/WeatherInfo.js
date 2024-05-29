// src/components/WeatherInfo.js
import React from "react";
import "./WeatherInfo.css";

const WeatherInfo = ({ weatherData, tempUnit }) => {
  const { name, sys, main, weather, wind, visibility, clouds, coord } = weatherData;
  console.log(weatherData);

  // Function to convert temperature based on selected unit
  const convertTemperature = (temp) => {
    return tempUnit === 'celsius' ? (temp - 273.15).toFixed(0) + '°C' : ((temp - 273.15) * 9 / 5 + 32).toFixed(0) + '°F';
  };

  // Function to capitalize the first letter of a string
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="full-weather">
      <div className="weather-info">
        <div className="weather-top">
          <h1>Current Weather in {name}, {sys.country}</h1>
        </div>
        <div className="weatherbelow">
          <div className="weather-left">
            <div className="weather-left-row row1">
              <div>
                
                <h2>{convertTemperature(main.temp)}</h2>
                <p>{capitalize(weather[0].description)}</p>
              </div>
              <div className="weather-icon"></div>
            </div>
            <div className="weather-left-row row2">
                
              <div>
              
                <h2>Sunrise</h2>
                <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
              </div>
              <div>
                <h2>Sunset</h2>
                <p>{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
          <div className="weather-right">
            <div className="right-rows">
              <h2>Latitude</h2>
              <p>{coord.lat}</p>
            </div>
            <div className="right-rows">
              <h2>Longitude</h2>
              <p>{coord.lon}</p>
            </div>
            <div className="right-rows">
              <h2>Humidity</h2>
              <p>{main.humidity}%</p>
            </div>
            <div className="right-rows">
              <h2>Pressure</h2>
              <p>{main.pressure} hPa</p>
            </div>
            <div className="right-rows">
              <h2>Visibility</h2>
              <p>{visibility} meters</p>
            </div>
            <div className="right-rows">
              <h2>Wind</h2>
              <p>Speed: {wind.speed} m/s</p>
            </div>
            <div className="right-rows">
              <h2>Cloudiness</h2>
              <p>{clouds.all}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
