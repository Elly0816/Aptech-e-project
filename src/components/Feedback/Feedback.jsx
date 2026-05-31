import { useDimensions } from '../../hooks/useDimensions';
import Button from '../Button/Button';
import './Feedback.css';

const Feedback = ({ className }) => {
  const { isMobile } = useDimensions();
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

            <input type="text" placeholder="e.g. Dr. Alistair Thorne" />
          </div>
        )}

        {/* Email */}
        {isMobile && (
          <div className="form-group">
            <label>EMAIL ADDRESS</label>

            <input type="email" placeholder="heritage@example.com" />
          </div>
        )}

        {/* Category */}
        <div className="form-group">
          <label>FEEDBACK CATEGORY</label>

          <select>
            <option>Historical Accuracy</option>
            <option>Bug Report</option>
            <option>Suggestion</option>
            <option>UI Improvement</option>
          </select>
        </div>

        {/* Contribution */}
        <div className="form-group">
          <label>DETAILED CONTRIBUTION</label>

          <textarea rows="5" placeholder="Describe your findings or suggestions with scholarly detail..."></textarea>
        </div>

        {/* Button */}
        {/* <button type="submit" className="submit-btn">
          SUBMIT FEEDBACK
        </button> */}
        <Button text={'SUBMIT FEEDBACK'} style={{ alignSelf: !isMobile ? 'flex-end' : 'stretch' }} />
      </form>
    </div>
  );
};

export default Feedback;
