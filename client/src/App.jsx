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

  return (
    <div>
      <h1>Consultar clima e eventos</h1>
      <input
        type="text"
        placeholder="Ex: Dallas, US"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherAndEvents}>Pesquisar</button>

      {weather && (
        <div>
          <h2>Tempo em {weather.city}, {weather.country}</h2>
          <ul>
            <li><strong>Descrição:</strong> {weather.description}</li>
            <li><strong>Temperatura:</strong> {weather.temp} °C</li>
            <li><strong>Humidade:</strong> {weather.humidity}%</li>
            <li><strong>Vento:</strong> {weather.wind} m/s</li>
          </ul>
        </div>
      )}

      {events.length > 0 ? (
        <div>
          <h2>Eventos recomendados para hoje:</h2>
          <ul>
            {events.map((event, i) => (
              <li key={i}>
                <strong>{event.title}</strong> - {event.start.slice(0, 10)} (Categoria: {event.category})
              </li>
            ))}
          </ul>
        </div>
      ) : weather ? (
        <p>Sem eventos adequados para hoje com base no clima.</p>
      ) : null}
    </div>
  );
}

export default App;
