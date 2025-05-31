import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchWeatherAndEvents = async () => {
    const res = await fetch(`http://localhost:5000/api?city=${city}`);
    const data = await res.json();
    setWeather(data.weather);
    setEvents(data.events);
  };

  // Converte descrição do tempo em classe CSS para background
  const getWeatherClass = (desc) => {
    if (!desc) return '';
    return 'bg-' + desc.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className={`app ${getWeatherClass(weather?.description)}`}>
      <div className="container">
        {/* Área de pesquisa */}
        <div className="search-section">
          <input
            type="text"
            className="input-city"
            placeholder="Escreve o nome da cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn-search" onClick={fetchWeatherAndEvents}>
            Pesquisar
          </button>
        </div>

        {/* Informação do tempo */}
        <div className="weather-section">
          {weather && (
            <div className="weather-info">
              <h2 className="weather-title">
                Tempo em {weather.city}, {weather.country}
              </h2>
              <ul className="weather-details">
                <li><strong>Descrição:</strong> {weather.description}</li>
                <li><strong>Temperatura:</strong> {weather.temp} °C</li>
                <li><strong>Humidade:</strong> {weather.humidity}%</li>
                <li><strong>Vento:</strong> {weather.wind} m/s</li>
              </ul>
            </div>
          )}
        </div>

        {/* Lista de eventos */}
        <div className="events-section">
          <h3 className="events-title">Eventos na cidade:</h3>
          {events.length > 0 ? (
            <div className="events-list-wrapper">
              <h4 className="events-subtitle">Eventos recomendados para hoje:</h4>
              <ul className="events-list">
                {events.map((event, i) => (
                  <li key={i} className="event-item">
                    <strong>{event.title} </strong> - {event.start.slice(0, 10)}
                  </li>
                ))}
              </ul>
            </div>
          ) : weather ? (
            <p className="no-events-message">
              Sem eventos adequados para hoje com base no clima.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
