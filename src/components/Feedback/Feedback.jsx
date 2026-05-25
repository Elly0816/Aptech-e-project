import React from "react";

const FeedbackPage = () => {
  return (
    <div className="feedback-container">
      <div className="feedback-card">

        <h1 className="feedback-title">FEEDBACK</h1>

        <form className="feedback-form">

          {/* Full Name */}
          <div className="form-group">
            <label>FULL NAME</label>

            <input
              type="text"
              placeholder="e.g. Dr. Alistair Thorne"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>EMAIL ADDRESS</label>

            <input
              type="email"
              placeholder="heritage@example.com"
            />
          </div>

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

            <textarea
              rows="5"
              placeholder="Describe your findings or suggestions with scholarly detail..."
            ></textarea>
          </div>

          {/* Button */}
          <button type="submit" className="submit-btn">
            SUBMIT FEEDBACK
          </button>

        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;