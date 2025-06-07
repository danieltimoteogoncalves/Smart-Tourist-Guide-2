import { useState, useRef } from 'react';
import EventoCategoriaImagens from './EventoCategoriaImagens';
import weatherTranslations from './weatherTranslations';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const inputRef = useRef(null);

  const fetchWeatherAndEvents = (cityToSearch = city) => {
    if (!cityToSearch.trim()) return;

    fetch(`http://localhost:5000/api?city=${cityToSearch}`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Erro ao buscar dados');
        }

        setWeather(data.weather);
        setEvents(data.events);
        setError(null);

        setHistory((prevHistory) => {
          const cityLower = cityToSearch.toLowerCase();
          if (prevHistory.find((c) => c.toLowerCase() === cityLower)) {
            return prevHistory;
          }
          return [cityToSearch, ...prevHistory].slice(0, 10);
        });

        setShowHistory(false); // esconde o histórico depois da pesquisa
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        setWeather(null);
        setEvents([]);
        setError(error.message);
        setShowHistory(false);
      });
  };

  const handleHistoryClick = (cityFromHistory) => {
    setCity(cityFromHistory);
    fetchWeatherAndEvents(cityFromHistory);
  };

  // Para evitar fechar o histórico antes de clicar numa cidade do histórico, usamos timeout no onBlur
  const handleInputBlur = () => {
    setTimeout(() => {
      setShowHistory(false);
    }, 150);
  };

  return (
    <div className={`app ${getWeatherClass(weather?.description)}`}>
      <div className="container">
        {/* Pesquisa */}
        <div className="search-section" style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            type="text"
            className="input-city"
            placeholder="Escreve o nome da cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchWeatherAndEvents()}
            onFocus={() => setShowHistory(true)}
            onBlur={handleInputBlur}
            autoComplete="off"
          />
          <button className="btn-search" onClick={() => fetchWeatherAndEvents()}>
            Pesquisar
          </button>

          {error && <div className="error-message">⚠️ {error}</div>}

          {/* Histórico de pesquisa — aparece apenas se showHistory for true */}
          {showHistory && history.length > 0 && (
            <ul
              className="search-history"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #ccc',
                maxHeight: '150px',
                overflowY: 'auto',
                zIndex: 10,
                margin: 0,
                padding: '0.5rem',
                listStyle: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                borderRadius: '0 0 4px 4px',
              }}
            >
              {history.map((cityName, idx) => (
                <li key={idx} style={{ padding: '0.3rem 0' }}>
                  <button
                    className="history-item"
                    onClick={() => handleHistoryClick(cityName)}
                    style={{
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      color: '#007bff',
                      textDecoration: 'underline',
                      padding: 0,
                      fontSize: '1rem',
                      width: '100%',
                      textAlign: 'left',
                    }}
                  >
                    {cityName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* resto do teu código igual */}

        <div className="weather-section">
          {weather && (
            <>
              <h2 className="weather-title">{weather.city}</h2>
              <h2 className="weather-temp">{weather.temp} °C</h2>

              {weather.icon && (
                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                    title={translateDescription(weather.description)}
                    style={{ width: '60px', height: '60px' }}
                  />
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {translateDescription(weather.description)}
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
            </>
          )}
        </div>

        <div className="events-section">
          <h3 className="events-title">Eventos na cidade:</h3>
          {events.length > 0 ? (
            <div className="events-grid">
              {events.map((event, i) => (
                <div key={i} className="event-card">
                  <EventoCategoriaImagens categoria={event.category} />
                  <div className="event-info">
                    <h4>{event.title}</h4>
                    <small>
                      {new Date(event.start_local).toLocaleString('pt-PT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </small>
                  </div>
                </div>
              ))}
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

  function getWeatherClass(desc) {
    if (!desc) return '';
    return 'bg-' + desc.toLowerCase().replace(/\s+/g, '-');
  }

  function translateDescription(desc) {
    if (!desc) return '';
    return weatherTranslations[desc.toLowerCase()] || desc;
  }
}

export default App;
