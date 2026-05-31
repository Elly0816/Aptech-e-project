// ContactUs.jsx

import { useState } from 'react';
import './ContactUs.css';
import { useDimensions } from '../../hooks/useDimensions';
import Button from '../Button/Button';

const ContactUs = ({ className }) => {
  const { isMobile } = useDimensions();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
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

    alert('Message Sent Successfully!');

    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    // <div className={`contact-card ${className}`}>
    <div className={`${className}`}>
      {isMobile && (
        <div className="insight-header-mobile">
          <h1 className="insight-title">Share Your Insights </h1>

          <p className="insight-subtitle">Help us preserve the world's heritage through modern technology.</p>
        </div>
      )}
      <h1 className="about-cards-title">CONTACT US</h1>

      <p className="description">Reach out to our archival team for direct inquiries.</p>

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
        {isMobile && (
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
        )}

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

        {/* <button type="submit" className="submit-btn">
          SEND MESSAGE
        </button> */}
        <Button
          text={'SEND MESSAGE'}
          style={{ alignSelf: !isMobile ? 'flex-end' : 'stretch' }}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default ContactUs;
