import React from 'react';
import './AirQualityCard.css';

const AirQualityCard = ({ aqi }) => {
  const getAQILevel = (value) => {
    if (!value) return { label: 'N/A', color: '#808080' };
    
    const levels = {
      1: { label: 'Excellent', color: 'green' },
      2: { label: 'Good', color: '#4caf50' },
      3: { label: 'Fair', color: '#ffeb3b' },
      4: { label: 'Moderate', color: '#ff9800' },
      5: { label: 'Poor', color: 'orange' },
      6: { label: 'Very Poor', color: '#9c27b0' },
      7: { label: 'Hazardeous', color: 'purple' }
    };
    return levels[value] || levels[1];
  };

  const currentAQI = aqi?.list?.[0]?.main?.aqi || 0;
  const aqiLevel = getAQILevel(currentAQI);
  const components = aqi?.list?.[0]?.components || {};

  const getAQIBarWidth = (value) => {
    const maxAQI = 500;
    return `${Math.min((value / maxAQI) * 100, 100)}%`;
  };

  const calculateAQIIndex = () => {
    if (!components) return 'N/A';
    
    const pm25Weight = components.pm2_5 * 0.6;
    const pm10Weight = components.pm10 * 0.2;
    const no2Weight = components.no2 * 0.1;
    const o3Weight = components.o3 * 0.1;
    
    const index = Math.round(pm25Weight + pm10Weight + no2Weight + o3Weight);
    return Math.min(Math.max(index, 0), 500);
  };

  const aqiIndex = calculateAQIIndex();

  return (
    <div className="aqi-card">
      <div className="aqi-header">
        <h2>Air Quality Index</h2>
      </div>
      
      <div className="aqi-content">
        <div className="aqi-status">
          <div className="aqi-level-container">
            <span>Current Level:</span>
            <span className="aqi-level" style={{ color: aqiLevel.color }}>
              {aqiLevel.label}
            </span>
          </div>
          <div className="aqi-index-container">
            <span>AQI:</span>
            <span className="aqi-index-value">{aqiIndex}</span>
          </div>
        </div>

        <div className="aqi-meter-container">
          <div className="aqi-meter">
            <div
              className="aqi-pointer"
              style={{ left: getAQIBarWidth(aqiIndex) }}
            />
          </div>
          
          
        </div>

        <div className="aqi-details">
          {[
            { label: 'PM2.5', key: 'pm2_5', unit: 'µg/m³' },
            { label: 'PM10', key: 'pm10', unit: 'µg/m³' },
            { label: 'NO2', key: 'no2', unit: 'µg/m³' },
            { label: 'O3', key: 'o3', unit: 'µg/m³' }
          ].map(({ label, key, unit }) => (
            <div key={key} className="aqi-item">
              <div className="aqi-item-content">
                <span className="aqi-item-label">{label}</span>
                <span className="aqi-item-value">
                  {components[key]?.toFixed(1) || 'N/A'} {unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;