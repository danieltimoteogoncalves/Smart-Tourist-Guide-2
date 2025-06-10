// Importa React e o componente que mostra a imagem da categoria do evento
import React from 'react';
import EventoCategoriaImagens from './EventoCategoriaImagens';

// Componente funcional que recebe dois props: events (lista de eventos) e weather (dados do tempo)
export default function EventsList({ events, weather }) {

  // Função para abrir o Google Maps com base na morada ou nas coordenadas do evento
  const openGoogleMaps = (event) => {
    // Se o evento tiver uma morada formatada disponível
    if (event.geo?.address?.formatted_address) {
      const query = encodeURIComponent(event.geo.address.formatted_address); // Codifica a morada para URL
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`; // URL do Google Maps
      window.open(url, '_blank'); // Abre numa nova aba
    } else if (event.location && event.location.length === 2) {
      // Caso contrário, tenta usar coordenadas [longitude, latitude]
      const lat = event.location[1]; // latitude
      const lon = event.location[0]; // longitude
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
      window.open(url, '_blank');
    } else {
      // Caso não haja localização disponível
      alert('Endereço não disponível para este evento.');
    }
  };

  // Renderização principal do componente
  return (
    <div className="events-section">
      <h3 className="events-title">Eventos na cidade:</h3>

      {/* Se houver eventos */}
      {events.length > 0 ? (
        <div className="events-grid">
          {events.map((event, i) => (
            <div
              key={i} // Chave única para cada elemento da lista
              className="event-card" // Classe CSS para o cartão do evento
              onClick={() => openGoogleMaps(event)} // Abre o Google Maps ao clicar
              style={{ cursor: 'pointer' }} // Cursor tipo "mãozinha"
              title="Abrir no Google Maps" // Texto ao passar o rato
            >
              {/* Mostra imagem da categoria do evento */}
              <EventoCategoriaImagens categoria={event.category} />

              {/* Informações do evento */}
              <div className="event-info">
                <h4>{event.title}</h4>
                <small>
                  {/* Data e hora do evento formatada para português de Portugal */}
                  {new Date(event.start_local).toLocaleString('pt-PT', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </small>
              </div>
            </div>
          ))}
        </div>
      ) : weather ? (
        // Se não houver eventos mas houver dados meteorológicos, mostra esta mensagem
        <p className="no-events-message">
          Sem eventos adequados para hoje com base no clima.
        </p>
      ) : null /* Se não houver eventos nem dados do tempo, não mostra nada */}
    </div>
  );
}
