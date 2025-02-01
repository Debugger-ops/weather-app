import React from 'react'
import './LifestyleTips.css'

const LifestyleTips = ({ weather, aqi }) => {
  const generateTips = () => {
    const tips = []
    const temp = weather?.main?.temp || 0
    const aqiLevel = aqi?.list?.[0]?.main?.aqi || 1
    const humidity = weather?.main?.humidity || 0
    const windSpeed = weather?.wind?.speed || 0
    const uvi = weather?.uvi || 0

    // Temperature based tips
    if (temp >= 35) {
      tips.push({
        icon: '🌡️',
        tip: 'Extreme heat - Stay indoors during peak hours (11 AM - 4 PM)'
      })
      tips.push({
        icon: '💧',
        tip: 'Drink water frequently, aim for 3-4 liters per day'
      })
    } else if (temp >= 30) {
      tips.push({
        icon: '☀️',
        tip: 'High temperature - Limit outdoor activities to morning or evening'
      })
      tips.push({
        icon: '💧',
        tip: 'Stay hydrated and wear light, breathable clothing'
      })
    } else if (temp <= 10) {
      tips.push({
        icon: '🧥',
        tip: 'Cold weather - Wear warm layers and protect extremities'
      })
    } else if (temp <= 5) {
      tips.push({
        icon: '❄️',
        tip: 'Very cold - Minimize outdoor exposure and keep warm'
      })
    }

    // AQI based tips
    if (aqiLevel >= 4) {
      tips.push({
        icon: '😷',
        tip: 'Poor air quality - Wear a mask when outdoors'
      })
      tips.push({
        icon: '🏠',
        tip: 'Keep windows closed and use air purifiers if available'
      })
    } else if (aqiLevel === 3) {
      tips.push({
        icon: '⚠️',
        tip: 'Moderate air quality - Sensitive groups should limit outdoor exposure'
      })
    }

    // UV based tips
    if (uvi >= 8) {
      tips.push({
        icon: '🧴',
        tip: 'Very high UV - Apply SPF 50+ sunscreen and wear protective clothing'
      })
    } else if (uvi >= 6) {
      tips.push({
        icon: '🕶️',
        tip: 'High UV - Use sunscreen and wear sunglasses'
      })
    }

    // Humidity based tips
    if (humidity > 80) {
      tips.push({
        icon: '💨',
        tip: 'High humidity - Use dehumidifier and watch for mold growth'
      })
    } else if (humidity < 30) {
      tips.push({
        icon: '🌵',
        tip: 'Low humidity - Use moisturizer and consider a humidifier'
      })
    }

    // Wind based tips
    if (windSpeed > 20) {
      tips.push({
        icon: '🌪️',
        tip: 'Strong winds - Secure loose outdoor items'
      })
    }

    return tips
  }

  const tips = generateTips()

  if (!weather || !aqi) {
    return <div className="lifestyle-tips-error">Unable to load weather data</div>
  }

  return (
    
    <div className="lifestyle-tips">
      <div className="lifestyle-tips-header">
        <h3>Lifestyle Recommendations</h3>
        <span className="tips-count">{tips.length} tips</span>
      </div>
      
      <div className="tips-container">
        {tips.map((tip, index) => (
          <div key={index} className="tip-item">
            <span className="tip-icon">{tip.icon}</span>
            <span className="tip-text">{tip.tip}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LifestyleTips