// Objeto que associa categorias de eventos a caminhos de imagens locais ou URLs externas
const categoriaImagens = {
  community: 'src/eventosImgs/community.jpg',           // Comunidade
  concerts: 'src/eventosImgs/concert.jpg',              // Concertos
  conferences: 'src/eventosImgs/conference.png',        // Conferências
  expos: 'src/eventosImgs/expos.jpg',                   // Exposições
  festivals: 'src/eventosImgs/festival.jpg',            // Festivais
  'performing-arts': 'src/eventosImgs/performingarts.jpg', // Artes performativas
  sports: 'src/eventosImgs/sports.jpg',                 // Desporto
  'severe-weather': 'https://cdn-icons-png.flaticon.com/512/414/414974.png', // Meteorologia severa (ícone online)
};

// Componente funcional que recebe uma categoria e mostra a imagem correspondente
const EventoCategoriaImagens = ({ categoria }) => {
  // Converte a categoria para minúsculas para garantir correspondência com as chaves do objeto
  const chave = categoria.toLowerCase();

  // Tenta obter a imagem correspondente à categoria; se não existir, usa um ícone genérico
  const imagem = categoriaImagens[chave] || 'https://cdn-icons-png.flaticon.com/512/565/565547.png';

  // Retorna o elemento <img> com a imagem da categoria
  return (
    <img
      src={imagem}           // Caminho ou URL da imagem
      alt={categoria}        // Texto alternativo para acessibilidade
      title={categoria}      // Texto que aparece ao passar o rato
      style={{
        width: '100%',               // Ocupa toda a largura disponível do contêiner
        height: '120px',             // Altura fixa da imagem
        objectFit: 'cover',          // Corta a imagem para preencher o espaço sem distorção
        borderRadius: '8px 8px 0 0', // Canto arredondado no topo (superior esquerdo e direito)
      }}
    />
  );
};

// Exporta o componente para poder ser usado noutras partes da aplicação
export default EventoCategoriaImagens;
