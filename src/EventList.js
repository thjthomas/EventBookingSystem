import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EventList.css";

function EventList({ events }) {
  return (
    <main className="event-list-container">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </main>
  );
}

function EventCard({ event }) {
  const navigate = useNavigate();
  const { id, name, date, description, img, remainingSlots } = event;

  const handleRegisterClick = (e) => {
    if (remainingSlots === 0) {
      e.preventDefault(); // Prevent button click if no slots are available
      return;
    }
    navigate(`/register/${id}`);
  };

  return (
    <article className="event-card">
      <Link to={`/events/${id}`} className="event-link">
        <div className="event-image-wrapper">
          <img src={img} alt={name} className="event-image" />
        </div>
        <div className="event-info">
          <h2 className="event-title">
            {name}
            <span className="event-date"> • {date}</span>
          </h2>
          <p className="event-description">
            {description.length > 100
              ? description.substring(0, 100) + "..."
              : description}
          </p>
        </div>
      </Link>

      {/* Conditionally render button styles */}
      <button
        className={`register-button ${remainingSlots === 0 ? "disabled" : ""}`}
        onClick={handleRegisterClick}
        disabled={remainingSlots === 0}
      >
        {remainingSlots === 0 ? "Sold Out" : "Register Now"}
      </button>
    </article>
  );
}

export default EventList;