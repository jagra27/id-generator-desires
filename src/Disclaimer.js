import React from 'react';

const Disclaimer = ({ onAccept, onDecline }) => {
  return (
    <div className="disclaimer-container">
      <h2>Disclaimer</h2>
      <p>
        This BEARcard generator is intended for use by Morgan State University students, 
        alumni, and authorized personnel only. By proceeding, you acknowledge that you 
        will use this tool responsibly and in accordance with university policies.
      </p>
      <p>
        The generated BEARcards are not official university identification and should not 
        be used as such. Morgan State University reserves the right to revoke access to 
        this tool at any time.
      </p>
      <p>Do you agree to these terms and confirm that you are authorized to use this tool?</p>
      <div className="disclaimer-buttons">
        <button onClick={onAccept}>Yes, I Agree</button>
        <button onClick={onDecline}>No, I Do Not Agree</button>
      </div>
    </div>
  );
};

export default Disclaimer;