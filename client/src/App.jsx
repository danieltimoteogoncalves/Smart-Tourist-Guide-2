import { useState, useRef, useEffect } from 'react'; // Importa os hooks do React: useState, useRef e useEffect
import SearchBar from './components/SearchBar'; // Importa o componente da barra de pesquisa
import WeatherInfo from './components/WeatherInfo'; // Importa o componente que mostra a informação do tempo
import EventsList from './components/EventsList'; // Importa o componente que mostra a lista de eventos
import EventoCategoriaImagens from './components/EventoCategoriaImagens'; // Importa imagens associadas às categorias dos eventos
import weatherTranslations from './components/WeatherTranslations'; // Importa o dicionário de traduções das descrições do tempo

function App() { // Declaração do componente principal App
  const [city, setCity] = useState(''); // Estado para a cidade introduzida pelo utilizador
  const [weather, setWeather] = useState(null); // Estado que armazena os dados do tempo
  const [events, setEvents] = useState([]); // Estado que armazena os eventos recebidos da API
  const [error, setError] = useState(null); // Estado que guarda mensagens de erro
  const [history, setHistory] = useState([]); // Estado que guarda o histórico de cidades pesquisadas
  const [showHistory, setShowHistory] = useState(false); // Estado que controla a visibilidade do histórico
  const [loading, setLoading] = useState(false); // Estado booleano que indica se os dados estão a ser carregados
  const [lastCity, setLastCity] = useState(''); // Estado que guarda a última cidade pesquisada para atualizações automáticas

  const inputRef = useRef(null); // Cria uma referência ao campo de input, útil para focar ou aceder diretamente

  const fetchWeatherAndEvents = (cityToSearch = city) => { // Função que vai buscar os dados do tempo e eventos ao backend
    if (!cityToSearch.trim()) return; // Se o campo estiver vazio, não faz nada

    setLoading(true); // Ativa o estado de carregamento (spinner)

    fetch(`http://localhost:5000/api?city=${cityToSearch}`) // Faz um pedido GET à API com a cidade como parâmetro
      .then(async (res) => { // Espera a resposta da API
        const data = await res.json(); // Converte a resposta para JSON

        if (!res.ok) { // Se a resposta não for OK (ex: erro 400 ou 500)
          throw new Error(data.error || 'Erro ao buscar dados'); // Lança uma exceção com a mensagem de erro
        }

        setWeather(data.weather); // Guarda os dados do tempo no estado
        setEvents(data.events); // Guarda os eventos no estado
        setError(null); // Limpa qualquer erro anterior
        
        //Atualizaçao real time ⚠️
        setLastCity(cityToSearch); // Atualiza a última cidade pesquisada

        setHistory((prevHistory) => { // Atualiza o histórico de pesquisas
          const cityLower = cityToSearch.toLowerCase(); // Converte para minúsculas
          if (prevHistory.find((c) => c.toLowerCase() === cityLower)) { // Verifica se já existe no histórico
            return prevHistory; // Se já existir, não adiciona
          }
          return [cityToSearch, ...prevHistory].slice(0, 10); // Adiciona no topo e limita a 10 entradas
        });

        setShowHistory(false); // Esconde o histórico após pesquisa
        setCity(''); // Limpa o campo de input
      })
      .catch((error) => { // Em caso de erro na fetch
        console.error('Erro ao buscar dados:', error); // Mostra o erro na consola
        setWeather(null); // Limpa os dados do tempo
        setEvents([]); // Limpa os eventos
        setError(error.message); // Guarda a mensagem de erro no estado
        setShowHistory(false); // Esconde o histórico
      })
      .finally(() => {
        setLoading(false); // Desativa o estado de carregamento
      });
  };

  const handleHistoryClick = (cityFromHistory) => { // Quando o utilizador clica numa cidade do histórico
    setCity(cityFromHistory); // Atualiza o estado da cidade
    fetchWeatherAndEvents(cityFromHistory); // Faz nova pesquisa com a cidade selecionada
  };

  const handleInputBlur = () => { // Quando o campo de input perde o foco
    setTimeout(() => { // Aguarda 150ms antes de esconder o histórico (permite clique)
      setShowHistory(false); // Esconde o histórico
    }, 150);
  };

  function getWeatherClass(desc) { // Função que gera a classe CSS para o fundo da aplicação com base na descrição do tempo
    if (!desc) return ''; // Se não houver descrição, devolve string vazia
    return 'bg-' + desc.toLowerCase().replace(/\s+/g, '-'); // Converte a descrição para minúsculas e troca espaços por traços
  }

  function translateDescription(desc) { // Função que traduz a descrição do tempo para português
    if (!desc) return ''; // Se não houver descrição, devolve string vazia
    return weatherTranslations[desc.toLowerCase()] || desc; // Devolve a tradução se existir, senão devolve o original
  }


  //Atuzalização automática a cada 30 segundos !!⚠️
  useEffect(() => { // Efeito que corre sempre que a última cidade muda
    if (!lastCity) return; // Se não houver última cidade, não faz nada

    const intervalId = setInterval(() => { // Cria um intervalo de 30 segundos
      fetchWeatherAndEvents(lastCity); // Atualiza os dados para a última cidade
    }, 30 * 1000); // 30 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente desmonta ou lastCity muda
  }, [lastCity]); // Dependência: sempre que lastCity mudar, corre novamente

  return ( // JSX a ser renderizado
    <div className={`app ${getWeatherClass(weather?.description)}`}> {/* Aplica classe de fundo conforme o tempo */}
      <div className="container"> {/* Div de conteúdo central */}
        <SearchBar
          city={city} // Estado da cidade
          setCity={setCity} // Função para alterar a cidade
          fetchWeatherAndEvents={fetchWeatherAndEvents} // Função de pesquisa
          showHistory={showHistory} // Estado para mostrar histórico
          setShowHistory={setShowHistory} // Função para alterar o estado do histórico
          history={history} // Histórico de cidades pesquisadas
          handleHistoryClick={handleHistoryClick} // Função chamada ao clicar num item do histórico
          inputRef={inputRef} // Referência ao input
          error={error} // Mensagem de erro (se houver)
          handleInputBlur={handleInputBlur} // Esconde o histórico ao perder o foco
        />

        {loading ? ( // Se estiver a carregar dados
          <div className="loading-overlay"> {/* Mostra spinner de loading */}
            <div className="spinner"></div>
          </div>
        ) : ( // Caso contrário, mostra os dados
          <>
            <WeatherInfo weather={weather} translateDescription={translateDescription} /> {/* Componente do tempo */}

            <EventsList
              events={events} // Lista de eventos
              weather={weather} // Informação do tempo
              EventoCategoriaImagens={EventoCategoriaImagens} // Componente de imagens por categoria
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App; // Exporta o componente App para ser usado noutros ficheiros
