// Componente funcional que representa a barra de pesquisa
export default function SearchBar({
  city,                  // Estado da cidade introduzida pelo utilizador
  setCity,               // Função para atualizar o estado da cidade
  fetchWeatherAndEvents, // Função que vai buscar os dados do tempo e eventos
  showHistory,           // Estado booleano para mostrar ou ocultar o histórico
  setShowHistory,        // Função para atualizar o estado do histórico visível
  history,               // Lista de cidades pesquisadas anteriormente
  handleHistoryClick,    // Função chamada quando o utilizador clica num item do histórico
  inputRef,              // Referência ao input (usado para focar ou controlar blur)
  error,                 // Mensagem de erro (por exemplo, cidade não encontrada)
  handleInputBlur,       // Função chamada quando o input perde o foco
}) {
  return (
    <div className="search-section" style={{ position: 'relative' }}>
      {/* Campo de input para o nome da cidade */}
      <input
        ref={inputRef} // Referência para aceder ao input externamente
        type="text"
        className="input-city"
        placeholder="Escreve o nome da cidade"
        value={city} // Valor controlado pela prop `city`
        onChange={(e) => setCity(e.target.value)} // Atualiza a cidade ao escrever
        onKeyDown={(e) => e.key === 'Enter' && fetchWeatherAndEvents()} // Pesquisa ao pressionar Enter
        onFocus={() => setShowHistory(true)} // Mostra o histórico ao focar o input
        onBlur={handleInputBlur} // Oculta histórico após perder o foco (com possível atraso)
      />

      {/* Botão para acionar a pesquisa */}
      <button className="btn-search" onClick={() => fetchWeatherAndEvents()}>
        Pesquisar
      </button>

      {/* Se houver erro, mostra uma mensagem de aviso */}
      {error && <div className="error-message">⚠️ {error}</div>}

      {/* Mostra o histórico de pesquisa se estiver ativo e contiver entradas */}
      {showHistory && history.length > 0 && (
        <ul
          className="search-history"
          style={{
            position: 'absolute',     // Para posicionar abaixo do input
            top: '100%',              // Logo abaixo do input
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
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)', // Sombra leve
            borderRadius: '0 0 4px 4px', // Cantos arredondados em baixo
          }}
        >
          {/* Lista cada cidade pesquisada anteriormente */}
          {history.map((cityName, idx) => (
            <li key={idx} style={{ padding: '0.3rem 0' }}>
              <button
                className="history-item"
                onClick={() => handleHistoryClick(cityName)} // Pesquisa ao clicar na cidade
                style={{
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  color: '#007bff',             // Cor azul típica de links
                  textDecoration: 'underline',  // Sublinhar
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
