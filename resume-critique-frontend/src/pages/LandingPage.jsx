import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="landing-container">
        <h1>Unlock Your Resume's Potential</h1>
        <p>Get section-wise AI-powered feedback tailored for ATS optimization.</p>
        <button onClick={() => navigate('/upload')}>Get Started</button>
      </div>
    </>
  );
};

export default LandingPage;
