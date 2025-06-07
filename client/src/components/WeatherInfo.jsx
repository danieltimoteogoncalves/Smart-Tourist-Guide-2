import React from 'react';
import weatherTranslations from './WeatherTranslations'; // ajusta o caminho se precisares

export default function WeatherInfo({ weather }) {
  if (!weather) return null;

  return (
    <div className="weather-section">
      <h2 className="weather-title">{weather.city}</h2>
      <h2 className="weather-temp">{weather.temp} °C</h2>

      {weather.icon && (
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            title={weatherTranslations[weather.description.toLowerCase()] || weather.description}
            style={{ width: '60px', height: '60px' }}
          />
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              textTransform: 'capitalize',
            }}
          >
            {weatherTranslations[weather.description.toLowerCase()] || weather.description}
          </div>
        </div>
      )}

      <br />

      <div className="weather-data">
        <div className="weather-item">
          <div className="value">{weather.feels_like} °C</div>
          <div className="label">Sensação térmica</div>
        </div>
        <div className="weather-item">
          <div className="value">{weather.humidity}%</div>
          <div className="label">Humidade</div>
        </div>
        <div className="weather-item">
          <div className="value">{weather.wind} m/s</div>
          <div className="label">Vento</div>
        </div>
      </div>
    </div>
  );
}
