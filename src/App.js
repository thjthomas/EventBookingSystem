import React, { useState, useEffect } from "react";
import "./App.css"; // Keep your global styles (reset, body, header, etc.)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventDetail from "./EventDetail";
import vilorLogo from "./assets/vilor-logo.png";
import EventSlider from "./EventSlider";
import RegisterPage from "./RegisterPage";
import EventList from "./EventList"; // <-- Import your new EventList component

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events/listing")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <EventSlider events={events} />
                <EventList events={events} />
              </>
            }
          />
          <Route path="/events/:id" element={<EventDetail events={events} />} />
          <Route path="/register/:id" element={<RegisterPage events={events} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="header-title">Upcoming Events</h1>
        <img src={vilorLogo} alt="Vilor Logo" className="vilor-logo" />
      </div>
    </header>
  );
}

export default App;