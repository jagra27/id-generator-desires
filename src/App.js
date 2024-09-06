import React, { useState, useEffect } from 'react';
import './App.css';
import Disclaimer from './Disclaimer';
import BEARcardGenerator from './BEARcardGenerator'; // Assume we've moved the main content to this component

const App = () => {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const handleAccept = () => {
    setDisclaimerAccepted(true);
    // Optionally, save this preference in localStorage
    localStorage.setItem('disclaimerAccepted', 'true');
  };

  const handleDecline = () => {
    // Redirect to a "sorry" page or Morgan State's homepage
    window.location.href = 'https://www.morgan.edu';
  };

  useEffect(() => {
    // Check if the user has previously accepted the disclaimer
    const accepted = localStorage.getItem('disclaimerAccepted');
    if (accepted === 'true') {
      setDisclaimerAccepted(true);
    }
  }, []);

  return (
    <div className="App">
      {!disclaimerAccepted ? (
        <Disclaimer onAccept={handleAccept} onDecline={handleDecline} />
      ) : (
        <BEARcardGenerator />
      )}
    </div>
  );
};

export default App;