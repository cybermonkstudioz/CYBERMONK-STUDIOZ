import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaTwitter, FaGithub, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { init, sendForm } from '@emailjs/browser';
import './ContactNew.css';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize EmailJS with your public key
  useEffect(() => {
    init("yfXCm23iQXArKUeA8");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        success: false,
        message: 'Please enter a valid email address.'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'cybermonkstudioz@gmail.com',
        message: formData.message
      };
      
      // Send the form using the form element
      const response = await sendForm(
        'service_ddvryn8',
        'template_tjw8fqi',
        e.target,
        'yfXCm23iQXArKUeA8'
      );
      
      if (response.status === 200) {
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! We\'ll get back to you soon.'
        });
        
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '0 2rem',
      overflow: 'hidden',
    },
    section: {
      padding: '6rem 0',
      position: 'relative',
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: '4rem',
    },
    heading2: {
      fontSize: '2.7rem',
      fontWeight: 700,
      marginBottom: '2.1rem',
      color: '#1a1a1a',
      lineHeight: 1.2,
    },
    heading3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: '#2d3748',
    },
    paragraph: {
      fontSize: '1.1rem',
      lineHeight: 1.8,
      color: '#4a5568',
      marginBottom: '1.5rem',
    },
    divider: {
      width: '80px',
      height: '4px',
      background: 'linear-gradient(90deg, #1b1b1bff, #b6b4baff)',
      margin: '0 auto 2rem',
      borderRadius: '2px',
    },
    grid: {
      display: 'grid',
      gap: '2rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    },
    card: {
      background: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      border: '1px solid #e2e8f0',
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <div className="contact-page">
      {/* Decorative Elements */}
      <div className="decorative-circle-1" />
      <div className="decorative-circle-2" />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="hero-grid"
          >
            <motion.div variants={fadeInUp} className="hero-content">
              <span className="hero-badge">
                Get In Touch
              </span>
              <h1 className="hero-title">
                Let's Create Something Extraordinary
              </h1>
              <div className="hero-divider" />
              <p className="hero-description">
                Have a groundbreaking idea? Let's bring it to life. Our team of creative experts is ready to collaborate and turn your vision into reality through innovative design solutions.
              </p>
              
              <div className="hero-buttons">
                <button 
                  onClick={() => {
                    console.log('Start a Project clicked');
                    navigate('/booking');
                  }}
                  className="hero-button hero-button-primary"
                >
                  <span>Start a Project</span>
                  <span>→</span>
                </button>
                
                <button 
                  onClick={() => {
                    console.log('View Our Work clicked');
                    navigate('/portfolio');
                  }}
                  className="hero-button hero-button-secondary"
                >
                  <span>View Our Work</span>
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="contact-form-card"
            >
              <div className="contact-form-background">
                <div className="contact-form-icon">
                  <span>📧</span>
                </div>
                <h3 className="contact-form-title">
                  Drop Us a Line
                </h3>
                <p className="contact-form-subtitle">
                  Have a project in mind or want to discuss potential collaboration? We'd love to hear from you.
                </p>
                <br></br>
                <br></br>
                <div className="contact-form-wrapper">
                  <form onSubmit={handleSubmit} className="contact-form">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                    <input
                      type="email"
                      placeholder="Your Email *"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                    <textarea
                      placeholder="Your Message *"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="form-textarea"
                    />
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="form-submit"
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          <span>Send Message</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                    
                    {/* Status Message */}
                    {submitStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`status-message ${submitStatus.success ? 'success' : 'error'}`}
                      >
                        {submitStatus.success ? (
                          <>
                            <FaCheckCircle />
                            <span>{submitStatus.message}</span>
                          </>
                        ) : (
                          <>
                            <FaTimesCircle />
                            <span>{submitStatus.message}</span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="stats-grid"
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="stat-card"
            >
              <div className="stat-card-content center-title">
                <div className="stat-icon">
                  <span>💬</span>
                </div>
                <h3 className="stat-title">
                  Get in touch with us for any inquiries
                </h3>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="stat-card"
            >
              <div className="stat-card-content">
                <div className="stat-icon">
                  <span>📧</span>
                </div>
                <h3 className="stat-title">
                  Email Us
                </h3>
                <div className="stat-content">
                   <p className="stat-description">
                    General Inquiries:
                  </p>
                  <a 
                    href="mailto:cybermonkstudioz@gmail.com"
                    className="stat-link"
                    title="cybermonkstudioz@gmail.com"
                  >
                    cybermonkstudioz@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="stat-card"
            >
              <div className="stat-card-content">
                <div className="stat-icon">
                  <span>📞</span>
                </div>
                <h3 className="stat-title">
                  Call Us
                </h3>
                <div className="stat-content">
                  <p className="stat-description">
                    Phone:
                  </p>
                  <div className="phone-links">
                    <a 
                      href="tel:+916374316014"
                      className="phone-link"
                    >
                      <span>📞</span>
                      <span>+91 6374316014</span>
                    </a>
                    <a 
                      href="tel:+919344531196"
                      className="phone-link"
                    >
                      <span>📱</span>
                      <span>+91 9344531196</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;