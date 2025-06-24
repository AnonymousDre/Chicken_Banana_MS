import React from 'react';
import './landing.css';

function LandingPage({ onLogout }) {
  return (
    <div className="landing-page">
      <header className="head">
        <div className="head-content">
          <h1>Dre's Landing Page</h1>
          <img src="osama.jpg" alt='My friend osama'></img>
          <p>CS-401</p>
          <button className="cta-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <footer className="footer">
        <p>&copy; 6APSI</p>
      </footer>
    </div>
  );
}

export default LandingPage;
