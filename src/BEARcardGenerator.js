import React, { useState, useEffect, useRef} from 'react';
import html2canvas from 'html2canvas';
import 'react-image-crop/dist/ReactCrop.css';
import './App.css';
import backgroundImage from './images/TransparentwithBackground.jpg';
import PhotoUploadModal from './PhotoUploadModal.js';
import defaultBearcardImage from './images/Teirra.jpg';

const App = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [idNumber, setIdNumber] = useState('');
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Generate a unique 8-digit ID number on page load
    const uniqueId = Math.floor(10000000 + Math.random() * 90000000);
    setIdNumber(uniqueId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsDropdownOpen(false);
  };

  const statusOptions = ['Morganite', 'Alumni', 'Student'];

  const handleDownload = () => {
    const element = document.getElementById('id-card');
    const scale = 3; 
    const desiredWidth = 1080;
    const desiredHeight = 1920; // Set a fixed height to match the aspect ratio of the ID card

    html2canvas(element, {
      scale: scale,
      width: element.offsetWidth,
      height: element.offsetHeight,
      useCORS: true,
      allowTaint: true,
      logging: true,
      onclone: (document) => {
        // Force the cloned element to have a set size
        const clonedElement = document.getElementById('id-card');
        clonedElement.style.width = `${desiredWidth / scale}px`;
        clonedElement.style.height = `${desiredHeight / scale}px`;
      }
    }).then(canvas => {
      const resizedCanvas = document.createElement('canvas');
      resizedCanvas.width = desiredWidth;
      resizedCanvas.height = desiredHeight;
      const ctx = resizedCanvas.getContext('2d');

      // Draw the original canvas onto the resized canvas
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, desiredWidth, desiredHeight);

      const link = document.createElement('a');
      link.href = resizedCanvas.toDataURL('image/png');
      link.download = 'id-card.png';
      link.click();
    });
  };

  const handleSavePhoto = (croppedImage) => {
    setImage(croppedImage);
  };

  const handleOverlayClick = () => {
    setShowOverlay(false);
  };

  return (
    <div className="App">
            {showOverlay && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="overlay-text">Click to make your own BEARcard</div>
          <img src={defaultBearcardImage} alt="Default BEARcard" className="default-bearcard" />
        </div>
      )}
      <div className={`content ${showOverlay ? 'blurred' : ''}`}></div>
      <div id="id-card" className="id-card">
        <img src={backgroundImage} alt="ID Background" className="base-image" />
        <div className="card-content">
          <div className="photo-upload-area" onClick={() => setIsModalOpen(true)}>
            {image ? (
              <img src={image} alt="Uploaded" className="uploaded-photo" />
            ) : (
              <strong className="submit-photo-text">Submit Photo</strong>
            )}
          </div>
          <div className="details">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="editable-field"
            />
            <div className="custom-dropdown" ref={dropdownRef}>
              <div 
                className="dropdown-header" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {status || 'Select Status'}
              </div>
              {isDropdownOpen && (
                <div className="dropdown-list">
                  {statusOptions.map((option) => (
                    <div 
                      key={option} 
                      className="dropdown-item"
                      onClick={() => handleStatusChange(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p>{idNumber}</p>
          </div>
        </div>
      </div>
      <div id='button-wrapper'>
        <button className="download-button" onClick={handleDownload}>Download ID</button>
      </div>
      <PhotoUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePhoto}
      />
    </div>
  );
}

export default App;
