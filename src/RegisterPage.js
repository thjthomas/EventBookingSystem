import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage({ events }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userFullName: "",
    email: "",
    contactNumber: "",
    nric: "",
    age: "",
    country: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(""); // For showing submission result

  const event = events.find((evt) => evt.id === parseInt(id, 10));

  if (!event) {
    return (
      <div className="register-page-container">
        <h2>Event not found.</h2>
        <p>The event ID in the URL might be invalid.</p>
      </div>
    );
  }

  const { name, date, fee, img } = event;

  const handleBackClick = () => {
    navigate(`/events/${id}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(?:\+60|60)\d{9,10}$/; // Matches +60 or 60 followed by 9–10 digits
    return regex.test(phoneNumber);
  };

  const validateNRIC = (nric) => {
    const regex = /^\d{6}-\d{2}-\d{4}$/; // Matches format 010203-04-0506
    return regex.test(nric);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userFullName) newErrors.userFullName = "Full Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid Email Address is required.";
    }
    if (!formData.contactNumber || !validatePhoneNumber(formData.contactNumber)) {
      newErrors.contactNumber = "Phone number must start with +60 or 60 and have 9–10 digits.";
    }
    if (!formData.nric || !validateNRIC(formData.nric)) {
      newErrors.nric = "NRIC must be in the format 010203-04-0506.";
    }
    if (!formData.age || isNaN(formData.age)) {
      newErrors.age = "Age must be a number.";
    }
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please correct the errors in the form.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setSubmitStatus(`Error: ${errorData.message || "Registration failed."}`);
        return;
      }

      const data = await response.json();
      setSubmitStatus("Registration successful!");
      console.log("Server response:", data);
      alert("Registration successful!");
      navigate(`/`);
    } catch (error) {
      setSubmitStatus("Error: Unable to connect to the server.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register-page-container">
      <button className="back-button" onClick={handleBackClick}>
        &larr; Back to Event Details
      </button>

      <h2 className="registration-header">Complete Your Registration</h2>

      <div className="register-content">
        <div className="register-form-column">
          <h3 className="form-title">Your Details</h3>
          <form className="register-form" onSubmit={handleCheckout}>
            <label htmlFor="userFullName">Full Name</label>
            <input
              type="text"
              id="userFullName"
              name="userFullName"
              value={formData.userFullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
            {errors.userFullName && <p className="error-text">{errors.userFullName}</p>}

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="e.g. +60123456789"
            />
            {errors.contactNumber && <p className="error-text">{errors.contactNumber}</p>}

            <label htmlFor="nric">NRIC / ID Number</label>
            <input
              type="text"
              id="nric"
              name="nric"
              value={formData.nric}
              onChange={handleChange}
              placeholder="e.g. 010203-04-0506"
            />
            {errors.nric && <p className="error-text">{errors.nric}</p>}

            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
            />
            {errors.age && <p className="error-text">{errors.age}</p>}

            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your country"
            />
            {errors.country && <p className="error-text">{errors.country}</p>}

            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="error-text">{errors.gender}</p>}

            
          </form>
          {submitStatus && <p className="submit-status">{submitStatus}</p>}
        </div>

        <div className="event-summary-column">
          <div className="event-image-wrapper">
            <img src={img} alt={name} className="event-image" />
          </div>
          <h2 className="event-title">{name}</h2>
          <p className="event-date">{date}</p>
          <p className="event-fee">Fee: RM{fee}</p>

          <button type="submit" className="checkout-button">
              Checkout
            </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;