import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResumeSectionCard from '../components/ResumeSectionCard';
import Navbar from '../components/Navbar';
import './ResultsPage.css'; // Custom styling

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.result;

  if (!data) {
    return (
      <div className="no-data">
        <p>⚠️ No result data found. Please upload a resume first.</p>
        <button onClick={() => navigate('/')}>Go to Upload Page</button>
      </div>
    );
  }

  const { jobRole, sections, feedback, recommendations } = data;

  return (
    <>
      <Navbar />
      <div className="results-container">
        <h2 className="results-title">📄 AI Feedback for <em>{jobRole}</em></h2>
        {Object.keys(sections).map((section) => (
          <ResumeSectionCard
            key={section}
            sectionTitle={section}
            sectionText={sections[section]}
            feedback={feedback[section]}
            recommendation={recommendations?.[section]}
          />
        ))}
      </div>
    </>
  );
};

export default ResultsPage;
