import React from "react";
import { Link } from "react-router-dom"; // <-- Import Link from react-router-dom
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./EventSlider.css"; // optional for custom styling

function EventSlider({ events }) {
  // Basic slider settings; see react-slick docs for all options
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,        // auto scroll
    autoplaySpeed: 3000,   // 3 seconds
    arrows: true,          // show left/right arrows
  };

  // If events is empty, show a fallback
  if (!events || events.length === 0) {
    return <div className="image-slider-container">Loading slider...</div>;
  }

  // Optionally, build a 'key' so that if events change, the slider re-initializes
  const sliderKey = events.map(evt => evt.img).join(",");

  return (
    <div className="image-slider-container">
      <Slider key={sliderKey} {...settings}>
        {events.map((event) => (
          <div key={event.id}>
            {/* Link to the detail page for this event */}
            <Link to={`/events/${event.id}`}>
              <img
                src={event.img}
                alt={event.name}
                className="slider-image"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default EventSlider;