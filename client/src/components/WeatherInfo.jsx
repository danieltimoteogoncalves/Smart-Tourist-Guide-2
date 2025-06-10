// Importa React e as traduções personalizadas do estado do tempo
import React from 'react';
import weatherTranslations from './WeatherTranslations'; // ajusta o caminho se necessário

// Componente funcional que recebe o objeto `weather` como prop
export default function WeatherInfo({ weather }) {
  // Se não houver dados de tempo, não renderiza nada
  if (!weather) return null;

  return (
    <div className="weather-section">
      {/* Nome da cidade */}
      <h2 className="weather-title">{weather.city}</h2>

      {/* Temperatura atual */}
      <h2 className="weather-temp">{weather.temp} °C</h2>

      {/* Ícone e descrição do estado do tempo, se existir */}
      {weather.icon && (
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} // URL da imagem do ícone
            alt={weather.description} // Descrição para acessibilidade
            title={weatherTranslations[weather.description.toLowerCase()] || weather.description} // Tradução (ou fallback)
            style={{ width: '60px', height: '60px' }} // Tamanho do ícone
          />
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              textTransform: 'capitalize', // Primeira letra em maiúscula
            }}
          >
            {/* Mostra a descrição traduzida ou a original se não houver tradução */}
            {weatherTranslations[weather.description.toLowerCase()] || weather.description}
          </div>
        </div>
      )}

      <br />

      {/* Dados adicionais sobre o clima */}
      <div className="weather-data">
        {/* Sensação térmica */}
        <div className="weather-item">
          <div className="value">{weather.feels_like} °C</div>
          <div className="label">Sensação térmica</div>
        </div>

        {/* Humidade relativa */}
        <div className="weather-item">
          <div className="value">{weather.humidity}%</div>
          <div className="label">Humidade</div>
        </div>

        {/* Velocidade do vento */}
        <div className="weather-item">
          <div className="value">{weather.wind} m/s</div>
          <div className="label">Vento</div>
        </div>
      </div>
    </div>
  );
}
