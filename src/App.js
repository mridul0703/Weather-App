import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import WeatherComponent from './components/Weather';
import HourlyWeather from './components/Hourlyweather';
import TenDaysWeather from './components/TenDaysWeather';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countryCode, setCountryCode] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('metric');
  const [userLocation, setUserLocation] = useState({ temp: '', city: '', country: '' });
  const [selectedLink, setSelectedLink] = useState('today'); // State to track selected link

  const WEATHER_API_KEY = '1fb9b7430ade9dc72614f3f70d323ea3';
  const GEOLOCATION_API_URL = 'https://ipapi.co/json/';

  useEffect(() => {
    fetch(GEOLOCATION_API_URL)
      .then(response => response.json())
      .then(data => {
        setCity(data.city);
        setCountryCode(data.country);
        fetchWeather(data.city, 'metric');
      });
  }, []);

  const fetchWeather = (city, unit) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${WEATHER_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data
        setWeather(data);
        setCountryCode(data.sys.country);
        setUserLocation({
          temp: data.main.temp.toFixed(1),
          city: data.name,
          country: data.sys.country
        });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        // Handle error if needed
      });
  };

  const handleInputChange = (inputValue) => {
    if (inputValue.length > 2) {
      fetch(`https://api.openweathermap.org/data/2.5/find?q=${inputValue}&type=like&sort=population&cnt=5&appid=${WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          const options = data.list.map(city => ({
            value: city.name,
            label: city.name,
          }));
          setOptions(options);
        });
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setCity(selectedOption.value);
    fetchWeather(selectedOption.value, temperatureUnit);
    setSelectedCity(null); // Reset search box
  };

  const handleUnitChange = (event) => {
    const unit = event.target.value;
    setTemperatureUnit(unit);
    fetchWeather(city, unit);
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className="App">
      <Navbar
        onInputChange={handleInputChange}
        onChange={handleChange}
        options={options}
        selectedCity={selectedCity}
        countryCode={countryCode}
        temperatureUnit={temperatureUnit}
        onUnitChange={handleUnitChange}
        userLocation={userLocation}
      />
      <div
        className="links-container"
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "rgba(255,255,255, 0.3)",
          padding: "15px 10vw",
        }}
      >
        <a href="#" className={`link-buttons ${selectedLink === 'today' ? 'selected' : ''}`} onClick={() => handleLinkClick('today')}>Today</a>
        <a href="#" className={`link-buttons ${selectedLink === 'hourly' ? 'selected' : ''}`} onClick={() => handleLinkClick('hourly')}>Hourly</a>
        <a href="#" className={`link-buttons ${selectedLink === '10days' ? 'selected' : ''}`} onClick={() => handleLinkClick('10days')}>10 Days</a>
        <a href="#" className={`link-buttons ${selectedLink === 'weekend' ? 'selected' : ''}`} onClick={() => handleLinkClick('weekend')}>Weekend</a>
        <a href="#" className={`link-buttons ${selectedLink === 'monthly' ? 'selected' : ''}`} onClick={() => handleLinkClick('monthly')}>Monthly</a>
      </div>
      {weather && selectedLink === 'today' && (
        <WeatherComponent weather={weather} temperatureUnit={temperatureUnit} />
      )}
      {selectedLink === 'hourly' && (
        <HourlyWeather city={city} temperatureUnit={temperatureUnit} WEATHER_API_KEY={WEATHER_API_KEY} />
      )}
      {selectedLink === '10days' && (
        <TenDaysWeather city={city} temperatureUnit={temperatureUnit} WEATHER_API_KEY={WEATHER_API_KEY} />
      )}
    </div>
  );
};

export default App;
