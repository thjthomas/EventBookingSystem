import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDetail.css";

function EventDetail({ events }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((evt) => evt.id === parseInt(id, 10));
  if (!event) {
    return (
      <div className="event-detail-container">
        <p>Event not found.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const { name, date, description, img, capacity, remainingSlots, fee } = event;

  const handleBackClick = () => {
    navigate(`/`);
  };

  // 1. Handle Register Button Click
  const handleRegisterClick = () => {
    // Navigate to the route: /register/<id>
    navigate(`/register/${id}`);
  };

  return (
    <div className="event-detail-container">
      <button className="back-button" onClick={handleBackClick}>
        &larr; Back to Main Page
      </button>

      <div className="event-detail-header">
        <h1 className="event-detail-title">{name}</h1>
        <p className="event-detail-date">{date}</p>
      </div>

      <div className="event-detail-main">
        <div className="event-detail-image-wrapper">
          <img src={img} alt={name} className="event-detail-image" />
        </div>

        <div className="event-detail-info">
          <p className="event-detail-description">{description}</p>
          <p>Capacity: {capacity}</p>
          <p>Remaining Slots: {remainingSlots}</p>
          <p>Entrance Fee: {fee === 0 ? "Free" : `RM${fee}`}</p>

          {remainingSlots > 0 ? (
            <button className="register-button" onClick={handleRegisterClick}>
              Register
            </button>
          ) : (
            <button className="register-button sold-out" disabled>
              Sold Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetail;