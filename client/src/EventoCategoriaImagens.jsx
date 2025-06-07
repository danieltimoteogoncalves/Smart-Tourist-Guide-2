const categoriaImagens = {
  community: 'src/eventosImgs/community.jpg',
  concerts: 'src/eventosImgs/concert.jpg',
  conferences: 'src/eventosImgs/conference.png',
  expos: 'src/eventosImgs/expos.jpg',
  festivals: 'src/eventosImgs/festival.jpg',
  'performing-arts': 'src/eventosImgs/performingarts.jpg',
  sports: 'src/eventosImgs/sports.jpg',
  'severe-weather': 'https://cdn-icons-png.flaticon.com/512/414/414974.png',
};

const EventoCategoriaImagens = ({ categoria }) => {
  const chave = categoria.toLowerCase();
  const imagem = categoriaImagens[chave] || 'https://cdn-icons-png.flaticon.com/512/565/565547.png';

  return (
    <img
      src={imagem}
      alt={categoria}
      title={categoria}
      style={{
        width: '100%',
        height: '120px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0',
      }}
    />
  );
};

export default EventoCategoriaImagens;
