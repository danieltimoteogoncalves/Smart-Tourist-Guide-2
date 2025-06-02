import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchWeatherAndEvents = () => {
    if (!city.trim()) return;

    fetch(`http://localhost:5000/api?city=${city}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data.weather);
        setEvents(data.events);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        setWeather(null);
        setEvents([]);
      });
  };

  // Função que cria a classe de fundo baseada na descrição do tempo
  const getWeatherClass = (desc) => {
    if (!desc) return '';
    return 'bg-' + desc.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className={`app ${getWeatherClass(weather?.description)}`}>
      <div className="container">
        {/* Pesquisa */}
        <div className="search-section">
          <input
            type="text"
            className="input-city"
            placeholder="Escreve o nome da cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchWeatherAndEvents()}
          />
          <button className="btn-search" onClick={fetchWeatherAndEvents}>
            Pesquisar
          </button>
        </div>

        {/* Tempo */}
        <div className="weather-section">
          {weather && (
            <>
              <h2 className="weather-title">
                 {weather.city}
              </h2>
              <br></br>
              <div className="weather-data">
                <div className="weather-item">
                  <div className="value">{weather.temp} °C</div>
                  <div className="label">Temperatura</div>
                </div>
                <div className="weather-item">
                  <div className="value">{weather.humidity}%</div>
                  <div className="label">Humidade</div>
                </div>
                <div className="weather-item">
                  <div className="value">{weather.wind} m/s</div>
                  <div className="label">Vento</div>
                </div>
                <div className="weather-item">
                  <div className="value" style={{ textTransform: 'capitalize' }}>{weather.description}</div>
                  <div className="label">Descrição</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Eventos */}
        <div className="events-section">
          <h3 className="events-title">Eventos na cidade:</h3>
          {events.length > 0 ? (
            <div className="events-list-wrapper">
              <ul className="events-list">
                <br></br>
                {events.map((event, i) => (
                  <li key={i} className="event-item">
                    <strong>{event.title}</strong> - {event.start.slice(0, 10)}
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
