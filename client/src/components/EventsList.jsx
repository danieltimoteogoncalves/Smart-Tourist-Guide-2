import React from 'react';
import EventoCategoriaImagens from './EventoCategoriaImagens'; // ajusta o caminho

export default function EventsList({ events, weather }) {
  return (
    <div className="events-section">
      <h3 className="events-title">Eventos na cidade:</h3>
      {events.length > 0 ? (
        <div className="events-grid">
          {events.map((event, i) => (
            <div key={i} className="event-card">
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
