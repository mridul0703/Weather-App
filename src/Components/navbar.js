import logo from "../Img/logo.png";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoRainyOutline, IoSnowSharp  } from "react-icons/io5";
import { MdOutlineWbSunny, MdCloudQueue , MdOutlineThunderstorm , MdOutlineDehaze} from "react-icons/md";
import { PiWind , PiCloudFogBold} from "react-icons/pi";
import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "./api";

const region = "IN";
const tempunit = "C";
const currentweather = "sunny";
const currenttemperature = "39°";
const currentlocation = "Bhopal, Madhya Pradesh";

const Currentweathericon = {
  top: "auto",
  height: "30px",
  width: "30px",
  color: "white",
  margin: "0 10px 0 0",
};
const Globe = {
  height: "25px",
  width: "25px",
  filter: "invert(1)",
  opacity: 0.6,
};

const HamburgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      className={`hamburger ${isOpen ? "open" : ""}`}
      onClick={handleToggle}
    >
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </button>
  );
};

export default function Navbar() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        const data = await fetchWeatherData(city);
        setWeather(data);
      };
      fetchWeather();
    }
  }, [city]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  const renderWeatherIcon = () => {
    if (!weather || !weather.weather) {
      return null;
    }
    const weatherMain = weather.weather[0].main;
    switch (weatherMain) {
      case "Clear":
        return <MdOutlineWbSunny style={Currentweathericon} />;
      case "Clouds":
        return <MdCloudQueue style={Currentweathericon} />;
      case "Rain":
        return <IoRainyOutline style={Currentweathericon} />;
      case "Drizzle":
        return <IoRainyOutline style={Currentweathericon} />;
      case "Thunderstorm":
        return <MdOutlineThunderstorm style={Currentweathericon} />;
      case "Snow":
        return <IoSnowSharp style={Currentweathericon} />;
      case "Mist":
        return <PiWind  style={Currentweathericon} />;
      case "Smoke":
        return <PiCloudFogBold style={Currentweathericon} />;
      case "Haze":
        return <MdOutlineDehaze style={Currentweathericon} />;
      case "Dust":
        return <MdOutlineDehaze style={Currentweathericon} />;
      case "Fog":
        return <PiCloudFogBold style={Currentweathericon} />;
      
      default:
        return null;
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="left">
          <img src={logo} alt="Logo" />
          <h1>Weather App</h1>
        </div>
        <input
          type="text"
          className="search"
          id="search"
          placeholder="Search City or Postcode"
          value={city}
          onChange={handleInputChange}
        />
        <div className="right">
          <div className="region" id="region">
            <FaGlobeAmericas style={Globe} />
            <p className="regionarea" id="regionarea">
              {region}
            </p>
            <p className="tempunit" id="tempunit">
              {tempunit}
            </p>
            <HamburgerButton />
          </div>
        </div>
      </div>
      <div className="currstat" id="currstat">
        <div className="cstate transparent-box">
          {renderWeatherIcon()}
          {weather && (
            <>
              {kelvinToCelsius(weather.main.temp)}° {weather.name}{" "}
              {weather.sys.country}
            </>
          )}
        </div>
      </div>
      <div className="stat" id="stat">
        <a href="#">Today</a>
        <a href="#">Hourly</a>
        <a href="#">10 Days</a>
        <a href="#">Weekend</a>
        <a href="#">Monthly</a>
      </div>
    </>
  );
}
