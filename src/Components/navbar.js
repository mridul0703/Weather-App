import logo from '../Img/logo.png';
import { FaGlobeAmericas } from 'react-icons/fa';
import React, { useState } from 'react';


const Globe = {
  height: '25px',
  width: '25px',
  filter: 'invert(1)',
  opacity: 0.6
};

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
                    <p className="regionarea" id="regionarea">IN</p>
                    <p className="tempunit" id="tempunit">C</p>
                    <HamburgerButton />
                </div>
            </div>
        </div>
        <div className="currstat" id="currstat"></div>
        <div className="stat" id="stat"></div>
        </>
        
    )
}
