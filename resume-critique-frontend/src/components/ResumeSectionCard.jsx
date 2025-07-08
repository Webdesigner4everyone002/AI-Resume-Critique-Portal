import React from 'react';
import './ResumeSectionCard.css';

const ResumeSectionCard = ({ sectionTitle, sectionText, feedback, recommendation }) => {
  // Ensure feedback & recommendation are arrays
  const feedbackList = Array.isArray(feedback) ? feedback : [feedback];
  const recommendationList = Array.isArray(recommendation) ? recommendation : (recommendation ? [recommendation] : []);

  return (
    <div className="section-card">
      <h3 className="section-title">{sectionTitle}</h3>
      
      <div className="section-content">
        <div className="original-text">
          <strong>📄 Original:</strong>
          <p>{sectionText}</p>
        </div>

        <div className="feedback-text">
          <strong>🧠 AI Feedback:</strong>
          <ul>
            {feedbackList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {recommendationList.length > 0 && (
          <div className="recommendation-text">
            <strong>✨ AI Recommendations:</strong>
            <ul>
              {recommendationList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeSectionCard;
