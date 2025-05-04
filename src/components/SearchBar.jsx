import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" className="weather">
        <circle cx="100" cy="80" r="30" className="sun" />
        <circle cx="100" cy="80" r="40" className="sun-glow" opacity="0.3" fill="lightyellow" />
        <path
          d="M85 100 C85 88 98 80 110 80 C110 65 130 65 135 80 C145 75 160 80 160 95 C160 110 145 115 135 115 L90 115 C80 115 70 110 70 100"
          fill="#fff"
          stroke="#60a5fa"
          strokeWidth="3"
        />
        <text
          x="200"
          y="100"
          fontFamily="Arial, sans-serif"
          fontSize="32"
          fontWeight="bold"
          textAnchor="middle"
          fill="#1e40af"  // Fill color for the text
        >
          WeatherNow
        </text>
        <text
          x="200"
          y="130"
          fontFamily="Arial, sans-serif"
          fontSize="16"
          textAnchor="middle"
          fill="#6b7280"  // Fill color for the subtext
        >
          Your Weather Companion
        </text>
      </svg>
      </div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
