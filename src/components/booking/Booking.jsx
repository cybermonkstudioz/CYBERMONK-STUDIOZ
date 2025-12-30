import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faEnvelope, faPhone, 
  faPenRuler, faVideo, faCamera, 
  faMobileScreen, faLaptopCode, faPalette 
} from '@fortawesome/free-solid-svg-icons';
import TawkTo from '../common/TawkTo';
import './Booking.css';

const services = [
  { id: 1, name: 'Graphic Design', icon: faPalette, color: '#8e44ad' },
  { id: 2, name: 'Video Editing', icon: faVideo, color: '#e74c3c' },
  { id: 3, name: 'Instagram Reels', icon: faMobileScreen, color: '#3498db' },
  { id: 4, name: 'Photo Editing', icon: faCamera, color: '#2ecc71' },
  { id: 5, name: 'Web Development', icon: faLaptopCode, color: '#f39c12' },
  { id: 7, name: 'App Development', icon: faMobileScreen, color: '#9b59b6' },
  { id: 6, name: 'Photography & Video', icon: faCamera, color: '#1abc9c' },
];

const Booking = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const formData = new FormData(form);
    if (selectedService) {
      formData.append('service', selectedService.name);
    }
    
    try {
      const response = await fetch('https://formspree.io/f/xldglpjn', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        form.reset();
        setSelectedService(null);
      } else {
        throw new Error('Something went wrong!');
      }
    } catch (error) {
      alert('There was a problem with your submission. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div 
        className="booking-success"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="success-message">
          <motion.div 
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            ✓
          </motion.div>
          <h2>Booking Confirmed!</h2>
          <p>Thank you for choosing Cyber Monk Studioz. We've received your request and will get back to you within 24 hours.</p>
          <button 
            className="back-btn" 
            onClick={() => setSubmitSuccess(false)}
          >
            Make Another Booking
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="booking-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TawkTo />
      <div className="booking-page">
        <div className="booking-header">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Start Your Creative Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Let's bring your vision to life. Fill in the details below and we'll get back to you within 24 hours.
          </motion.p>
        </div>
        
        <form 
          method="POST"
          onSubmit={handleSubmit} 
          className="booking-form"
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                <FontAwesomeIcon icon={faUser} className="icon" />
                Full Name
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="Your Name"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="youremail@example.com"
                className="input-field"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                Phone Number
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="+91 1234567890"
                className="input-field"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Select Service</label>
            <div className="service-grid">
              {services.map((service) => (
                <motion.div 
                  key={service.id}
                  className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                  onClick={() => setSelectedService(service)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    '--service-color': service.color,
                    borderColor: selectedService?.id === service.id ? service.color : '#e0e0e0'
                  }}
                >
                  <div className="service-icon" style={{ backgroundColor: `${service.color}15` }}>
                    <FontAwesomeIcon icon={service.icon} style={{ color: service.color }} />
                  </div>
                  <span>{service.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Tell us about your project
            </label>
            <textarea 
              id="message" 
              name="message" 
              rows="4" 
              placeholder="Share details about your project, goals, and any specific requirements you have in mind..."
              className="input-field"
            ></textarea>
          </div>

          <motion.button 
            type="submit" 
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="btn-loader"></span>
            ) : (
              <span>Get Started <span className="arrow">→</span></span>
            )}
          </motion.button>
          
          <p className="privacy-note">
            We respect your privacy. Your information is secure and will never be shared with third parties.
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Booking;
