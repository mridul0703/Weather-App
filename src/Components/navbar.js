import logo from '../Img/logo.png';
import { FaGlobeAmericas } from 'react-icons/fa';
import { TiWeatherSunny } from "react-icons/ti";
import React, { useState } from 'react';


const region = "IN";
const tempunit = "C";
const currentweather = "sunny";
const currenttemperature = "39°";
const currentlocation = "Bhopal, Madhya Pradesh";

const Currentweathericon = {
  top: 'auto',
  height: '30px',
  width: '30px',
  color : 'wheat',
  margin : '0 10px 0 0',
};
const Globe = {
  height: '25px',
  width: '25px',
  filter: 'invert(1)',
  opacity: 0.6
};

function getWeatherIcon() {
  if (currentweather === 'sunny'){
    return(
      <TiWeatherSunny style={Currentweathericon}/>
    )
  }
}

const HamburgerButton = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <button className={`hamburger ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
    );
  };
  

export default function Navbar (){
    return(
      <>
      <div className="navbar">
            <div className="left">
                <img src={logo} alt="Logo" />
                <h1>Weather App</h1>
            </div>
            <input type="text" className="search" id="search" placeholder='Search City or Postcode'/>
            <div className="right">
                <div className="region" id="region">
                    <FaGlobeAmericas style={Globe}/>
                    <p className="regionarea" id="regionarea">{region}</p>
                    <p className="tempunit" id="tempunit">{tempunit}</p>
                    <HamburgerButton />
                </div>
            </div>
        </div>
        <div className="currstat" id="currstat">
          <div className="cstate transparent-box">
              {getWeatherIcon()}
              {currenttemperature}{ ` `}
              {currentlocation}
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
        
    )
}
