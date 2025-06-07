import { useState, useRef } from 'react';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import EventsList from './components/EventsList';
import EventoCategoriaImagens from './components/EventoCategoriaImagens'; 
import weatherTranslations from './components/WeatherTranslations';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false); // estado loading

  const inputRef = useRef(null);

  const fetchWeatherAndEvents = (cityToSearch = city) => {
    if (!cityToSearch.trim()) return;

    setLoading(true); // ativa o loading

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

        setShowHistory(false);
        setCity(''); // limpa input
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        setWeather(null);
        setEvents([]);
        setError(error.message);
        setShowHistory(false);
      })
      .finally(() => {
        setLoading(false); // desativa o loading sempre que acabar
      });
  };

  const handleHistoryClick = (cityFromHistory) => {
    setCity(cityFromHistory);
    fetchWeatherAndEvents(cityFromHistory);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowHistory(false);
    }, 150);
  };

  function getWeatherClass(desc) {
    if (!desc) return '';
    return 'bg-' + desc.toLowerCase().replace(/\s+/g, '-');
  }

  function translateDescription(desc) {
    if (!desc) return '';
    return weatherTranslations[desc.toLowerCase()] || desc;
  }

  return (
    <div className={`app ${getWeatherClass(weather?.description)}`}>
      <div className="container">
        <SearchBar
          city={city}
          setCity={setCity}
          fetchWeatherAndEvents={fetchWeatherAndEvents}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          history={history}
          handleHistoryClick={handleHistoryClick}
          inputRef={inputRef}
          error={error}
          handleInputBlur={handleInputBlur}
        />

        {loading ? (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <WeatherInfo weather={weather} translateDescription={translateDescription} />

            <EventsList
              events={events}
              weather={weather}
              EventoCategoriaImagens={EventoCategoriaImagens}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
