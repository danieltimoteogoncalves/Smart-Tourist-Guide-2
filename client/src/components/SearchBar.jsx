export default function SearchBar({
  city,
  setCity,
  fetchWeatherAndEvents,
  showHistory,
  setShowHistory,
  history,
  handleHistoryClick,
  inputRef,
  error,
  handleInputBlur,
}) {
  return (
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
      />
      <button className="btn-search" onClick={() => fetchWeatherAndEvents()}>
        Pesquisar
      </button>

      {error && <div className="error-message">⚠️ {error}</div>}

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
  );
}
