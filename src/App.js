import React, { useState } from 'react';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

  return (
    <div>
      {isLoggedIn ? (
        <LandingPage onLogout={handleLogout} /> 
      ) : (
        <LoginPage onLogin={handleLoginSuccess} /> 
      )}
    </div>
  );
}

export default App;
