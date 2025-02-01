import React, { useState, useEffect } from 'react';

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;
  ;

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        setForecast(data);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    };

    fetchForecast();
  }, [city]);

  if (!forecast) return null;

  // Get one forecast per day
  const dailyForecast = forecast.list.filter((f, index) => index % 8 === 0);

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {dailyForecast.map((day) => (
          <div key={day.dt} className="forecast-item">
            <div className="date">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <img 
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <div className="temp">{Math.round(day.main.temp)}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;