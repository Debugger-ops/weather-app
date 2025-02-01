import React from 'react';

const WeatherCard = ({ weather }) => {
  const temperature = Math.round(weather.main.temp);
  const description = weather.weather[0].description;
  const icon = weather.weather[0].icon;

  return (
    <div className="weather-card ">
      <h2>{weather.name}</h2>
      <div className="weather-info">
        <img 
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
        />
        <div className="temperature">{temperature}°C</div>
        <div className="description">{description}</div>
      </div>
     
    </div>
  );
};

export default WeatherCard;