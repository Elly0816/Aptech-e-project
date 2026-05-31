import { useState } from 'react';
import { useDimensions } from '../../hooks/useDimensions';
import Button from '../Button/Button';
import './Feedback.css';

const Feedback = ({ className }) => {
  const { isMobile } = useDimensions();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: '',
    contribution: '',
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

    alert('Feedback Sent Successfully!');

    setFormData({
      fullName: '',
      email: '',
      category: '',
      contribution: '',
    });
  };

  return (
    // <div className={`feedback-card ${className}`}>
    <div className={`${className}`}>
      {/* Share Your Insight Header */}
      {!isMobile && (
        <div className="insight-header">
          <h1 className="insight-title">Share Your Insights </h1>

          <p className="insight-subtitle">Help us preserve history through modern technology.</p>
        </div>
      )}

      <h1 className="about-cards-title">{`FEEDBACK ${!isMobile ? 'DETAILS' : ''}`}</h1>

      <form className="feedback-form">
        {/* Full Name */}
        {isMobile && (
          <div className="form-group">
            <label>FULL NAME</label>

            <input name="fullName" type="text" placeholder="e.g. Dr. Alistair Thorne" onChange={handleChange} />
          </div>
        )}

        {/* Email */}
        {isMobile && (
          <div className="form-group">
            <label>EMAIL ADDRESS</label>

            <input name="email" type="email" placeholder="heritage@example.com" onChange={handleChange} />
          </div>
        )}

        {/* Category */}
        <div className="form-group">
          <label>FEEDBACK CATEGORY</label>

          <select name="category" onChange={handleChange}>
            <option>Historical Accuracy</option>
            <option>Bug Report</option>
            <option>Suggestion</option>
            <option>UI Improvement</option>
          </select>
        </div>

        {/* Contribution */}
        <div className="form-group">
          <label>DETAILED CONTRIBUTION</label>

          <textarea
            name="contribution"
            rows="5"
            placeholder="Describe your findings or suggestions with scholarly detail..."
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Button */}
        {/* <button type="submit" className="submit-btn">
          SUBMIT FEEDBACK
        </button> */}
        <Button
          text={'SUBMIT FEEDBACK'}
          style={{ alignSelf: !isMobile ? 'flex-end' : 'stretch' }}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Feedback;
