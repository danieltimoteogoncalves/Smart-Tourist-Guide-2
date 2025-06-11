export default function SearchBar({
  city,              // Valor atual da cidade escrita no input
  setCity,           // Função para atualizar o valor da cidade
  fetchWeatherAndEvents, // Função para buscar o tempo e eventos da cidade
  showHistory,       // Booleano que indica se o histórico de pesquisa está visível
  setShowHistory,    // Função para mostrar ou esconder o histórico
  history,           // Array com cidades pesquisadas anteriormente
  handleHistoryClick,// Função chamada quando se clica numa cidade do histórico
  inputRef,          // Referência para o elemento input (para controlo direto)
  error,             // Mensagem de erro a mostrar, se existir
  handleInputBlur,   // Função chamada quando o input perde o foco
}) {
  return (
    <div className="search-section">
      {/* Input de texto para escrever o nome da cidade */}
      <input
        ref={inputRef}                      // Associa a referência ao input para controlo direto
        type="text"                        // Tipo do input: texto
        className="input-city"             // Classe CSS para estilização
        placeholder="Escreva o nome da cidade" // Texto placeholder para orientar o utilizador
        value={city}                      // Valor controlado do input (estado da cidade)
        onChange={(e) => setCity(e.target.value)} // Atualiza o estado da cidade ao escrever
        onKeyDown={(e) => e.key === 'Enter' && fetchWeatherAndEvents()} // Se premir Enter, busca dados
        onFocus={() => setShowHistory(true)}   // Quando o input recebe foco, mostra o histórico
        onBlur={handleInputBlur}                // Quando o input perde foco, executa função para esconder histórico
      />

      {/* Botão para disparar a pesquisa manualmente */}
      <button className="btn-search" onClick={() => fetchWeatherAndEvents()}>
        Pesquisar
      </button>

      {/* Se existir erro, mostra mensagem de erro */}
      {error && <div className="error-message">⚠️ {error}</div>}

      {/* Se o histórico estiver ativo e tiver itens, mostra lista do histórico */}
      {showHistory && history.length > 0 && (
        <ul className="search-history">
          {/* Itera pelo array history e cria um botão para cada cidade */}
          {history.map((cityName, idx) => (
            <li key={idx}>
              <button
                className="history-item"
                onClick={() => handleHistoryClick(cityName)} // Ao clicar, usa a cidade do histórico
              >
                {cityName}  {/* Nome da cidade do histórico */}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
