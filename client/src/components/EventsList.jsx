import React from 'react';
import EventoCategoriaImagens from './EventoCategoriaImagens';

export default function EventsList({ events, weather }) {
  // Abrir Google Maps com endereço ou coordenadas
  const openGoogleMaps = (event) => {
    if (event.geo?.address?.formatted_address) {
      const query = encodeURIComponent(event.geo.address.formatted_address);
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      window.open(url, '_blank');
    } else if (event.location && event.location.length === 2) {
      // event.location = [longitude, latitude]
      const lat = event.location[1];
      const lon = event.location[0];
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
      window.open(url, '_blank');
    } else {
      alert('Endereço não disponível para este evento.');
    }
  };

  return (
    <div className="events-section">
      <h3 className="events-title">Eventos na cidade:</h3>
      {events.length > 0 ? (
        <div className="events-grid">
          {events.map((event, i) => (
            <div
              key={i}
              className="event-card"
              onClick={() => openGoogleMaps(event)}
              style={{ cursor: 'pointer' }}
              title="Abrir no Google Maps"
            >
              <EventoCategoriaImagens categoria={event.category} />
              <div className="event-info">
                <h4>{event.title}</h4>
                <small>
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
        <p className="no-events-message">
          Sem eventos adequados para hoje com base no clima.
        </p>
      ) : null}
    </div>
  );
}
