import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiMessageSquare, FiX, FiFilter, FiCheck, FiClock, FiDollarSign, FiLayers, FiMonitor, FiSmartphone, FiVideo, FiScissors, FiCamera } from 'react-icons/fi';
import { FaPalette, FaInstagram, FaVideo as FaVideoIcon } from 'react-icons/fa';
import { IoIosSwitch } from 'react-icons/io';
import styled, { keyframes } from 'styled-components';
import FluidCursor from '../common/FluidCursor';

// Modal Component
const ServiceModal = ({ service, onClose, navigate }) => {
  const modalRef = useRef();
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        overflowY: 'auto'
      }}
    >
      <motion.div
        ref={modalRef}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#000000ff',
            zIndex: 10
          }}
        >
          <FiX />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <div style={{
            padding: '2.5rem 2.5rem 1.5rem',
            borderBottom: '1px solid #f3f4f6',
            position: 'relative',
            background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
                color: 'white',
                fontSize: '1.75rem',
                marginRight: '1.5rem',
                flexShrink: 0
              }}>
                {service.icon}
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  margin: '0 0 0.5rem',
                  color: '#111827'
                }}>
                  {service.title}
                </h2>
                <p style={{
                  color: '#000000ff',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: '#eef2ff',
                    color: '#4f46e5',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    {service.category === 'web' ? 'Web & App' : 
                     service.category === 'design' ? 'Design' : 'Media'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{
            padding: '2rem 2.5rem',
            flex: 1,
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  margin: '0 0 1rem',
                  color: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <FiLayers />
                  Service Overview
                </h3>
                <p style={{
                  color: '#000000ff',
                  lineHeight: 1.7,
                  margin: '0 0 1.5rem'
                }}>
                  {service.detailedDescription || service.description}
                </p>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  margin: '2rem 0 1rem',
                  color: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <FiCheck />
                  What's Included
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {service.features.map((feature, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      color: '#000000ff', 
                      lineHeight: 1.5
                    }}>
                      <span style={{
                        color: '#10b981',
                        flexShrink: 0,
                        marginTop: '0.25rem'
                      }}>
                        <FiCheck />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid #e5e7eb',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    margin: '0 0 1rem',
                    color: '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FiDollarSign />
                    Pricing
                  </h3>
                  
                  {service.pricing ? (
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '2rem',
                          fontWeight: 700,
                          color: '#111827'
                        }}>
                          ${service.pricing.startingAt}
                        </span>
                        <span style={{
                          color: '#010101ff',
                          marginLeft: '0.5rem'
                        }}>
                          starting at
                        </span>
                      </div>
                      <p style={{
                        color: '#000000ff',
                        fontSize: '0.875rem',
                        margin: '0 0 1.5rem'
                      }}>
                        {service.pricing.description}
                      </p>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}>
                        {service.pricing.details.map((detail, i) => (
                          <li key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#000000ff',
                            fontSize: '0.9375rem'
                          }}>
                            <span style={{
                              color: '#4f46e5',
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                              <FiCheck size={16} />
                            </span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p style={{
                      color: '#000000f4ff',
                      fontStyle: 'italic',
                      margin: '0 0 1.5rem'
                    }}>
                      Contact us for a custom quote based on your specific requirements.
                    </p>
                  )}

                  <Link
                    to="/booking"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      transition: 'background-color 0.3s ease, transform 0.2s ease',
                      marginTop: '1.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/booking', { state: { service: service.title } });
                    }}
                  >
                    Get Started
                    <FiArrowRight style={{ marginLeft: '0.5rem' }} />
                  </Link>
                </div>

                <div style={{
                  backgroundColor: '#f0fdf4',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid #bbf7d0',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    margin: '0 0 1rem',
                    color: '#166534',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FiClock />
                    Delivery Time
                  </h3>
                  <p style={{
                    color: '#166534',
                    margin: '0 0 0.5rem',
                    fontWeight: 500
                  }}>
                    {service.deliveryTime || '2-4 weeks'}
                  </p>
                  <p style={{
                    color: '#166534',
                    opacity: 0.8,
                    fontSize: '0.875rem',
                    margin: 0
                  }}>
                    Estimated time for project completion
                  </p>
                </div>
              </div>
            </div>

            {service.additionalSections?.map((section, i) => (
              <div key={i} style={{
                marginTop: '2rem',
                paddingTop: '2rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  margin: '0 0 1rem',
                  color: '#111827'
                }}>
                  {section.title}
                </h3>
                <p style={{
                  color: '#4b5563',
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            padding: '1.5rem 2.5rem',
            borderTop: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f9fafb',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px'
          }}>
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #d1d5db',
                color: '#0a0a0aff',
                padding: '0.5rem 1.25rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
            >
              <FiX />
              Close
            </button>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '0.625rem 1.25rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
            >
              Get Started
              <FiArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const serviceCategories = [
    { id: 'all', name: 'All Services' },
    { id: 'web', name: 'Web & App' },
    { id: 'design', name: 'Design' },
    { id: 'media', name: 'Media Production' },
  ];

  const services = [
    {
      id: 1,
      title: 'Website Design & Development',
      description: 'Modern, fast, and mobile-friendly websites that turn visitors into customers with seamless user experiences.',
      icon: <FiMonitor size={36} className="service-icon" style={{ color: '#4f46e5' }} />,
      category: 'web',
      features: ['Responsive Design', 'SEO Optimized', 'E-commerce', 'CMS Integration']
    },
    {
      id: 2,
      title: 'App Design & Development',
      description: 'Intuitive and attractive mobile applications built for both iOS and Android platforms.',
      icon: <FiSmartphone size={36} className="service-icon" style={{ color: '#3b82f6' }} />,
      category: 'web',
      features: ['iOS & Android', 'Cross-Platform', 'Design', 'API Integration']
    },
    {
      id: 3,
      title: 'Graphic Design',
      description: 'Eye-catching designs that build strong brand identity and visual communication.',
      icon: <FaPalette size={36} className="service-icon" style={{ color: '#ec4899' }} />,
      category: 'design',
      features: ['Logo Design', 'Branding', 'Print Materials', 'Social Media Graphics']
    },
    {
      id: 4,
      title: 'Video Production & Editing',
      description: 'Professional video production and editing services that tell your brand story effectively.',
      icon: <FiScissors size={36} className="service-icon" style={{ color: '#10b981' }} />,
      category: 'media',
      features: ['4K Quality', 'Motion Graphics', 'Color Grading', 'Sound Design']
    },
    {
      id: 5,
      title: 'Instagram Reels Editing',
      description: 'Engaging content and strategy for all major social media platforms.',
      icon: <FaInstagram size={36} className="service-icon" style={{ color: '#e11d48' }} />,
      category: 'media',
      features: ['Content Strategy', 'Reels/Shorts', 'Stories', 'Social Media Management']
    },
    {
      id: 6,
      title: 'Photography Services',
      description: 'Professional photography that captures your brand\'s essence and tells your story.',
      icon: <FiCamera size={36} className="service-icon" style={{ color: '#3b82f6' }} />,
      category: 'media',
      features: ['Product Photography', 'Portrait', 'Event Coverage', 'Drone Shots']
    },
    {
      id: 7,
      title: 'Print & Packaging',
      description: 'High-quality printing services for all your branding and packaging needs.',
      icon: <FiLayers size={36} className="service-icon" style={{ color: '#f59e0b' }} />,
      category: 'design',
      features: ['Business Cards', 'Brochures', 'Product Packaging', 'Large Format']
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  // Toggle cursor effect
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <FluidCursor />
      {/* Floating Action Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            className="floating-contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/contact" className="contact-button">
              <FiMessageSquare className="contact-icon" />
              <span>Get a Quote</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="services-hero" style={{
        padding: 'calc(var(--spacing-xxl) * 1.5) 0 var(--spacing-xxl)',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        color: 'var(--color-black)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 var(--spacing-md)',
            }}
          >
            <motion.div variants={fadeInUp} className="text-center">
              <span className="section-subtitle" style={{
                display: 'inline-block',
                color: '#6c757d',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '1rem',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>What We Offer</span>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                margin: '0.5rem 0 1.5rem',
                background: 'linear-gradient(45deg, #000000ff, #000000ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                Transform Your Digital Presence
              </h1>
              <div style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)',
                margin: '0 auto 2rem',
                borderRadius: '2px'
              }} />
              <p style={{
                fontSize: '1.25rem',
                maxWidth: '700px',
                opacity: 0.9,
                lineHeight: 1.8,
                margin: '0 auto var(--spacing-xxl)',
                color: '#4a5568'
              }}>
                We craft exceptional digital experiences that drive results. From stunning websites to engaging content, 
                our comprehensive services are designed to elevate your brand in the digital landscape.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid" style={{
        padding: 'var(--spacing-xxl) 0',
        backgroundColor: '#f8fafc',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container" style={{ position: 'relative' }}>
          {/* Category Filter */}
          <div className="category-filter" style={{
            marginBottom: 'var(--spacing-xxl)',
            position: 'relative',
            zIndex: 2
          }}>
            <div className="filter-toggle" onClick={() => setIsFilterOpen(!isFilterOpen)} 
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#fff',
                borderRadius: '50px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                margin: '0 auto',
                width: 'fit-content',
                border: '1px solid #e2e8f0',
                fontWeight: 500
              }}
            >
              <FiFilter style={{ marginRight: '0.5rem' }} />
              Filter Services
            </div>
            
            <motion.div 
              className="filter-options"
              initial={false}
              animate={{
                opacity: isFilterOpen ? 1 : 1,
                height: isFilterOpen ? 'auto' : 'auto',
                y: isFilterOpen ? 0 : 0
              }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                overflow: 'hidden'
              }}
            >
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    border: 'none',
                    backgroundColor: selectedCategory === category.id ? '#4f46e5' : '#fff',
                    color: selectedCategory === category.id ? '#fff' : '#4a5568',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {category.name}
                  {selectedCategory === category.id && (
                    <span style={{ marginLeft: '0.5rem', transform: 'translateY(1px)' }}>
                      <FiX size={16} />
                    </span>
                  )}
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid rgba(0, 0, 0, 0.03)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === index 
                    ? '0 15px 40px rgba(79, 70, 229, 0.15)' 
                    : '0 10px 30px rgba(0,0,0,0.04)'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{
                  padding: '2rem 2rem 1.5rem',
                  position: 'relative',
                  zIndex: 1,
                  flexGrow: 1
                }}>
                  
                  <div style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem 0'
                  }}>
                    <div className="icon-card" style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div className="icon-bg" style={{
                        backgroundImage: `url('data:image/svg+xml;base64,${btoa(`<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' fill='none'/><path d='M0,0 L100,100 M100,0 L0,100' stroke='currentColor' stroke-width='0.5' opacity='0.2'/></svg>`)}`
                      }}></div>
                      <div className="icon-overlay" style={{
                        background: `linear-gradient(135deg, ${service.icon.props.style.color}20 0%, ${service.icon.props.style.color}40 100%)`
                      }}></div>
                      {React.cloneElement(service.icon, {
                        style: {
                          ...service.icon.props.style,
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                          zIndex: 2
                        }
                      })}
                    </div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      margin: '1rem 0 0',
                      color: '#1a202c',
                      lineHeight: 1.3,
                      textAlign: 'center'
                    }}>
                      {service.title}
                    </h3>
                  </div>
                  
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: '#4a5568',
                    marginBottom: '1.5rem',
                    minHeight: '4.5em'
                  }}>
                    {service.description}
                  </p>
                  
                  <div style={{ margin: '1.5rem 0' }}>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      {service.features.map((feature, i) => (
                        <span key={i} style={{
                          display: 'inline-block',
                          backgroundColor: '#f0f4ff',
                          color: '#4f46e5',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          padding: '0.25rem 0.75rem',
                          borderRadius: '50px',
                          whiteSpace: 'nowrap'
                        }}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div style={{
                  padding: '1.25rem 2rem',
                  borderTop: '1px solid #edf2f7',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#f8fafc',
                  transition: 'all 0.3s ease'
                }}>
                  <Link 
                    to="/booking" 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: '#4f46e5',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      padding: '0.5rem 0'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/booking', { state: { service: service.title } });
                    }}
                  >
                    <span style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'transform 0.3s ease',
                      transform: hoveredCard === index ? 'translateX(5px)' : 'none'
                    }}>
                      Get Started
                      <FiArrowRight style={{ marginLeft: '0.5rem', transition: 'transform 0.3s ease' }} />
                    </span>
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: '#4f46e5',
                      transform: hoveredCard === index ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease'
                    }} />
                  </Link>
                  
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#718096',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '50px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    fontWeight: 500
                  }}>
                    {service.category === 'web' ? 'Web & App' : 
                     service.category === 'design' ? 'Design' : 'Media'}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        marginTop: 'var(--spacing-xxl)',
        textAlign: 'center',
      }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                marginBottom: 'var(--spacing-md)',
                color: 'var(--color-black)',
              }}>
                Ready to start your project?
              </h2>
              <p style={{
                fontSize: '1.25rem',
                maxWidth: '700px',
                margin: '0 auto var(--spacing-xl)',
                opacity: 0.8,
                lineHeight: 1.7,
              }}>
                Let's work together to bring your ideas to life. Get in touch to discuss how we can help you achieve your goals.
              </p>
              <Link 
                to="/contact" 
                className="btn btn-primary"
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  backgroundColor: 'var(--color-black)',
                  color: 'var(--color-white)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--color-black)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-black)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-black)';
                  e.currentTarget.style.color = 'var(--color-white)';
                }}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Add these styles to your global CSS or component styles
const styles = `
  .service-card {
    position: relative;
    transition: all 0.3s ease;
    border-radius: 16px;
    overflow: hidden;
    background: #ffffff;
    color: #1a1a1a;
    padding: 2rem;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  }
  
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .service-icon {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    transform-origin: center;
    position: relative;
    z-index: 1;
  }
  
  .icon-card {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
  }
  
  .icon-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    z-index: -1;
  }
  
  .icon-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    z-index: -1;
  }
  
  .service-card:hover .service-icon {
    animation: tilt-bounce 0.6s ease-in-out;
  }
  
  .service-card:hover .icon-card {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }
  
  @keyframes tilt-bounce {
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-3deg) scale(1.05); }
    50% { transform: rotate(3deg) scale(1.1); }
    75% { transform: rotate(-2deg) scale(1.07); }
    100% { transform: rotate(0deg) scale(1.05); }
  }
  
  .service-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: white;
  }
  
  .service-card p {
    color: #aaa;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ffffffff, #ffffffff);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  .service-card:hover::before {
    transform: scaleX(1);
  }
  
  @media (max-width: 768px) {
    .services-grid {
      padding: var(--spacing-xl) 0;
    }
    
    .filter-options {
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
    }
    
    .filter-toggle {
      display: flex !important;
    }
    
    .filter-options {
      display: none;
    }
    
    .filter-options.show {
      display: flex;
    }
  }
`;

// Add the styles to the document head
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default Services;
