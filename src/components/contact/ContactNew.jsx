import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaTwitter, FaGithub, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { init, sendForm } from '@emailjs/browser';

const Contact = () => {
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
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
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
    <div className="contact-page" style={{ 
      backgroundColor: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,162,77,0.1) 0%, rgba(201,162,77,0) 70%)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(11,11,11,0.03) 0%, rgba(11,11,11,0) 70%)',
        zIndex: 0
      }} />

      {/* Hero Section */}
      <section className="contact-hero" style={{
        padding: 'calc(var(--spacing-xxl) * 2) 0 var(--spacing-xxl)',
        backgroundColor: 'var(--color-white)',
        color: 'var(--color-black)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 var(--spacing-lg)',
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--spacing-xxl)',
              alignItems: 'center'
            }}
          >
            <motion.div variants={fadeInUp}>
              <span style={{
                display: 'inline-block',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                color: '#4f46e5',
                padding: '0.5rem 1.2rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Get In Touch
              </span>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '1.5rem',
                color: '#1a1a1a',
                maxWidth: '90%'
              }}>
                Let's Create Something Extraordinary
              </h1>
              <div style={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #1b1b1bff, #b6b4baff)',
                margin: '0 0 2rem',
                borderRadius: '2px',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: 'shimmer 2s infinite',
                }} />
              </div>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#4a5568',
                marginBottom: '1.5rem',
                maxWidth: '90%'
              }}>
                Have a groundbreaking idea? Let's bring it to life. Our team of creative experts is ready to collaborate and turn your vision into reality through innovative design solutions.
              </p>
              
              <div style={{
                display: 'flex',
                gap: 'var(--spacing-md)',
                marginTop: 'var(--spacing-xl)'
              }}>
                <button style={{
                  padding: '0.8rem 2rem',
                  background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(79, 70, 229, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}>
                  <span>Start a Project</span>
                  <span style={{ fontSize: '1.2rem' }}>→</span>
                </button>
                
                <button style={{
                  padding: '0.8rem 2rem',
                  background: 'transparent',
                  color: 'var(--color-black)',
                  border: '2px solid var(--color-black)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.backgroundColor = 'var(--color-black)';
                  e.target.color = 'var(--color-white)';
                }}
                onMouseOut={(e) => {
                  e.target.backgroundColor = 'transparent';
                  e.target.color = 'var(--color-black)';
                }}>
                  <span>View Our Work</span>
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              style={{
                position: 'relative',
                height: '100%',
                minHeight: '600px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: 'var(--spacing-xl)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(201, 162, 77, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  <span style={{
                    fontSize: '2.5rem',
                    color: 'var(--color-accent)'
                  }}></span>
                </div>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  marginBottom: 'var(--spacing-sm)',
                  color: 'var(--color-black)'
                }}>
                  Drop Us a Line
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  marginBottom: '1rem',
                  maxWidth: '80%',
                  lineHeight: 1.6
                }}>
                  Have a project in mind or want to discuss potential collaboration? We'd love to hear from you.
                </p>
                
                <div style={{
                  width: '100%',
                  maxWidth: '450px',
                  margin: '-50px auto 0',
                  position: 'relative',
                  zIndex: 1,
                  padding: '30px',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                }}>
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '1rem 1.5rem',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: 'white',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                          marginBottom: '1rem'
                        }}
                      />
                      <input
                        type="email"
                        placeholder="Your Email *"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '1rem 1.5rem',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: 'white',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                          marginBottom: '1rem'
                        }}
                      />
                      <textarea
                        placeholder="Your Message *"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="3"
                        style={{
                          width: '100%',
                          minHeight: '100px',
                          maxHeight: '120px',
                          padding: '0.8rem 1.2rem',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '0.95rem',
                          backgroundColor: 'white',
                          transition: 'all 0.3s ease',
                          resize: 'vertical',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                          marginBottom: '0.5rem',
                          fontFamily: 'inherit',
                          lineHeight: '1.5'
                        }}
                      />
                      
                      <div style={{ margin: '1rem 0' }}>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          style={{
                            width: '100%',
                            padding: '0.6rem 1.5rem',
                            background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)',
                            margin: '0 auto',
                            maxWidth: '100%',
                            boxSizing: 'border-box'
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.4)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(79, 70, 229, 0.3)';
                          }}
                        >
                        {isSubmitting ? 'Sending...' : (
                          <>
                            <span>Send Message</span>
                            <span style={{ fontSize: '1.2rem' }}>→</span>
                          </>
                        )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Status Message */}
                    {submitStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          marginTop: '1rem',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          backgroundColor: submitStatus.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: submitStatus.success ? '#10b981' : '#ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.9rem',
                          fontWeight: 500
                        }}
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
      <section style={{
        padding: 'var(--spacing-xxl) 0',
        backgroundColor: 'var(--color-white)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--spacing-xl)',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 var(--spacing-md)',
            }}
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              style={{
                height: '100%',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--spacing-xl)',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                height: '100%',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(201, 162, 77, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-md)',
                  transition: 'all 0.3s ease'
                }}>
                  <span style={{ 
                    fontSize: '1.8rem',
                    color: 'var(--color-accent)'
                  }}>💬</span>
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  margin: '0 auto',
                  textAlign: 'center',
                  color: 'var(--color-black)',
                  lineHeight: '1.4'
                }}>
                  Get in touch with us for any inquiries
                </h3>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              style={{
                height: '100%',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--spacing-lg)',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                height: '100%',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(201, 162, 77, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-md)',
                  transition: 'all 0.3s ease',
                  flexShrink: 0
                }}>
                  <span style={{ 
                    fontSize: '1.8rem',
                    color: 'var(--color-accent)'
                  }}>📧</span>
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  color: 'var(--color-black)'
                }}>
                  Email Us
                </h3>
                <div style={{
                  marginTop: 'auto',
                  overflow: 'hidden'
                }}>
                   <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-black)',
                    opacity: 0.8,
                    marginBottom: '0.75rem',
                  }}>
                    General Inquiries:
                  </p>
                  <a 
                    href="mailto:cybermonkstudioz@gmail.com"
                    style={{
                      color: 'var(--color-black)',
                      textDecoration: 'none',
                      fontWeight: 500,
                      transition: 'opacity 0.3s ease',
                      fontSize: '0.85rem',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                      maxWidth: '100%'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
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
              style={{
                height: '100%',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--spacing-lg)',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                height: '100%',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(201, 162, 77, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-md)',
                  transition: 'all 0.3s ease',
                  flexShrink: 0
                }}>
                  <span style={{ 
                    fontSize: '1.8rem',
                    color: 'var(--color-accent)'
                  }}>📞</span>
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  color: 'var(--color-black)'
                }}>
                  Call Us
                </h3>
                <div style={{ 
                  width: '100%',
                  marginTop: 'auto'
                }}>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-black)',
                    opacity: 0.8,
                    marginBottom: '0.75rem',
                  }}>
                    Phone:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <a 
                      href="tel:+916374316014"
                      style={{
                        color: 'var(--color-black)',
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.95rem',
                        whiteSpace: 'nowrap',
                        padding: '0.25rem 0'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <span style={{ flexShrink: 0 }}>📞</span>
                      <span>+91 6374316014</span>
                    </a>
                    <a 
                      href="tel:+919344531196"
                      style={{
                        color: 'var(--color-black)',
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.95rem',
                        whiteSpace: 'nowrap',
                        padding: '0.25rem 0'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <span style={{ flexShrink: 0 }}>📱</span>
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