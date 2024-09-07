import React from 'react';

const Disclaimer = ({ onAccept, onDecline }) => {
  return (
    <div className="disclaimer-container">
      <h2>Disclaimer</h2>
      <p>
      NO REFRENCE to alcohol, drugs, or tobacco related products may be used in conjunction with university marks. 
      No sexual content, profanity, or violence is not permitted or endorsed in conjunction with any university marks or likeness. 
      </p>
      <p>
      This is not an official Morgan State IDENTIFICATION. It does not admit you as a student or qualify you as alumni. 
      This is strictly for promotional use and enjoyment of our upcoming homecoming.
      </p>
      <div className="disclaimer-buttons">
        <button onClick={onAccept}>Okay</button>
      </div>
    </div>
  );
};

export default Disclaimer;