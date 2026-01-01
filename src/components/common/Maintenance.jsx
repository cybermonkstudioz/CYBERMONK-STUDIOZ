import React from 'react';
import Lottie from 'lottie-react';
import maintenanceAnimation from '../../assets/animations/ServisHero Loading.json';
import './Maintenance.css';

const Maintenance = () => {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        <div className="animation-wrapper">
          <Lottie 
            animationData={maintenanceAnimation}
            loop={true}
            autoplay={true}
            style={{ width: 300, height: 300 }}
          />
        </div>
        <h1 className="maintenance-title">Under Maintenance</h1>
        <p className="maintenance-message">
          We're currently performing some scheduled maintenance to improve your experience.
          We'll be back shortly!
        </p>
        <div className="maintenance-info">
          <p>
            <strong>Expected downtime:</strong> 2-3 hours<br />
            <strong>Started:</strong> {new Date().toLocaleString()}
          </p>
        </div>
        <div className="maintenance-contact">
          <p>For urgent inquiries, please contact us at:</p>
          <a href="mailto:support@cybermonkstudioz.com" className="contact-link">
            support@cybermonkstudioz.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
