// ContactUs.jsx

import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Message Sent Successfully!");

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="contact-section">
      <div className="quote-box">
        <div className="quote-line"></div>

        <div>
          <p className="quote">
            “A people without the knowledge of their past history,
            origin and culture is like a tree without roots.”
          </p>

          <span className="author">— MARCUS GARVEY</span>
        </div>
      </div>

      <div className="contact-card">
        <h1 className="main-title">Contact Us</h1>

        <p className="description">
          Reach out to our archival team for direct inquiries.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div className="form-group">
            <label>FULL NAME</label>

            <input
              type="text"
              name="fullName"
              placeholder="e.g. Dr. Alistair Thorne"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>EMAIL ADDRESS</label>

            <input
              type="email"
              name="email"
              placeholder="heritage@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* SUBJECT */}
          <div className="form-group">
            <label>SUBJECT LINE</label>

            <input
              type="text"
              name="subject"
              placeholder="A brief summary of your message"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          {/* MESSAGE */}
          <div className="form-group">
            <label>MESSAGE</label>

            <textarea
              rows="5"
              name="message"
              placeholder="Your message to the curators..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;