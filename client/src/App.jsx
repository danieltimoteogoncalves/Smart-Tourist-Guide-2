import { useState } from 'react';
import EventoCategoriaImagens from './EventoCategoriaImagens';
import weatherTranslations from './weatherTranslations'; // Ajusta o caminho

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeatherAndEvents = () => {
    if (!city.trim()) return;

    fetch(`http://localhost:5000/api?city=${city}`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Erro ao buscar dados');
        }

        setWeather(data.weather);
        setEvents(data.events);
        setError(null);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        setWeather(null);
        setEvents([]);
        setError(error.message);
      });
  };

  const getWeatherClass = (desc) => {
    if (!desc) return '';
    return 'bg-' + desc.toLowerCase().replace(/\s+/g, '-');
  };

  const translateDescription = (desc) => {
    if (!desc) return '';
    return weatherTranslations[desc.toLowerCase()] || desc;
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
            onKeyDown={(e) => e.key === 'Enter' && fetchWeatherAndEvents()}
          />
          <button className="btn-search" onClick={fetchWeatherAndEvents}>
            Pesquisar
          </button>

          {error && <div className="error-message">⚠️ {error}</div>}
        </div>

        {/* Tempo */}
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

        {/* Eventos */}
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
}

export default App;
