import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import WeatherForecast from './WeatherForecast';
import AirQualityCard from './AirQualityCard';
import DetailedMetrics from './DetailedMetrics';
import LifestyleTips from './LifestyleTips';
import SearchBar from './SearchBar';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [city, setCity] = useState('Delhi');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const geoResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const geoData = await geoResponse.json();

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.coord.lat}&lon=${geoData.coord.lon}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();

      const aqiResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${geoData.coord.lat}&lon=${geoData.coord.lon}&appid=${API_KEY}`
      );
      const aqiData = await aqiResponse.json();

      setWeather(weatherData);
      setAirQuality(aqiData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  const getBackgroundClass = () => {
    if (weather) {
      const condition = weather.weather[0].main.toLowerCase();
      return condition;
    }
    return '';
  };

  return (
    <div className={`weather-dashboard ${getBackgroundClass()}`}>
      <SearchBar onSearch={handleCityChange} />

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {weather && (
        <>
          <WeatherCard weather={weather} />
          <WeatherForecast city={city} />
          <AirQualityCard aqi={airQuality} />
          <DetailedMetrics weather={weather} />
          <LifestyleTips weather={weather} aqi={airQuality} />

        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
