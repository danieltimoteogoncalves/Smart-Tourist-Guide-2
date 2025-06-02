import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeatherAndEvents = () => {
  if (!city.trim()) return;

  fetch(`http://localhost:5000/api?city=${city}`)
    .then(async res => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao buscar dados');
      }

      setWeather(data.weather);
      setEvents(data.events);
      setError(null); // limpa erro anterior
    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
      setWeather(null);
      setEvents([]);
      setError(error.message);
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

          {error && (
        <div className="error-message">
            ⚠️ {error}
        </div>
)}
        </div>

        {/* Tempo */}
        <div className="weather-section">
          {weather && (
            <>
              <h2 className="weather-title">
                 {weather.city}
              </h2>
              <h2 className="weather-temp">
                {weather.temp} °C
              </h2>
              <br></br>
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
                    <strong>{event.title}</strong> – {" "}
                    {new Date(event.start_local).toLocaleString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
