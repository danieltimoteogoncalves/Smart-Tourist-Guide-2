const categoriaImagens = {
  sports: 'https://cdn-icons-png.flaticon.com/512/2965/2965567.png',
  concerts: 'https://cdn-icons-png.flaticon.com/512/727/727245.png',
  'severe-weather': 'https://cdn-icons-png.flaticon.com/512/414/414974.png',
  festivals: 'https://cdn-icons-png.flaticon.com/512/742/742750.png',
  // adiciona mais categorias conforme necessário
};

const EventoCategoriaImagens = ({ categoria }) => {
  const imagem = categoriaImagens[categoria.toLowerCase()] || 'https://cdn-icons-png.flaticon.com/512/565/565547.png'; // imagem default

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
