import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import './App.css';

function App() {
  return (
    <div className="app flex flex-column">
      <WeatherDashboard />
    </div>
  );
}

export default App;