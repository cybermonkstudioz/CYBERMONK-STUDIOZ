import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaQuoteLeft, 
  FaQuoteRight, 
  FaArrowRight, 
  FaArrowLeft, 
  FaLightbulb, 
  FaHandsHelping, 
  FaRocket, 
  FaHeart, 
  FaUsers, 
  FaChartLine 
} from 'react-icons/fa';
import { FiUsers, FiLayers, FiCode, FiCheckCircle } from 'react-icons/fi';
import Logo from '../common/Logo';
import './About.css';

// Import team member images
import hariImg from '../../../src/assets/images/hari.jpg';
import ragavImg from '../../../src/assets/images/ragav.jpg';
import monickImg from '../../../src/assets/images/MONICK.jpeg';
import NishanthImg from '../../../src/assets/images/Nishanth.jpg';
import sgkImg from '../../../src/assets/images/sgk.jpeg';
import aaruhyaImg from '../../../src/assets/images/aaruhya.jpeg';
import harishImg from '../../../src/assets/images/harish.jpg';

// Styles
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
    color: 'var(--color-text-primary)',
    lineHeight: 1.2,
  },
  heading3: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--color-text-primary)',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: 1.8,
    color: 'var(--color-text-secondary)',
    marginBottom: '1.5rem',
  },
  divider: {
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))',
    margin: '0 auto 2rem',
    borderRadius: '2px',
  },
  grid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  },
  card: {
    background: 'var(--color-card-bg)',
    backdropFilter: 'blur(10px)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
  },
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const stats = [
  { id: 1, value: 6, label: 'Projects Completed', icon: <FiLayers size={40} /> },
  { id: 2, value: 6, label: 'Happy Clients', icon: <FiUsers size={40} /> },
  { id: 3, value: 98, label: 'Success Rate', icon: <FiCheckCircle size={40} /> },
];

const About = () => {
  // Team member card styles
  const teamMemberStyles = `
    .team-member-card {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transform: translateZ(0);
      will-change: transform;
    }
    
    .team-member-card:hover {
      z-index: 10 !important;
    }
    
    .team-member-image-container {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transform: translateZ(0);
    }
    
    .member-bio {
      opacity: 0;
      visibility: hidden;
      transform: translateY(100%);
      transition: all 0.3s ease;
    }
    
    .team-member-card:hover .member-bio {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .team-member-card:hover .team-member-image-container img {
      transform: scale(1.05);
    }
  `;
  // Add styles to the head when component mounts
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = teamMemberStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animated Counter Component
  const Counter = ({ value, label }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      // Only start counting if the value is a number
      if (typeof value !== 'number') return;
      
      const increment = Math.max(1, Math.ceil(value / 30));
      let currentCount = 0;
      
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(currentCount);
        }
      }, 30);
      
      return () => clearInterval(timer);
    }, [value]);

    return (
      <motion.div 
        className="stat-item"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
          }
        }}
        style={{
          textAlign: 'center',
          padding: '2rem 1rem',
          borderRadius: '12px',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          boxShadow: '5px 5px 15px #d9d9d9, -5px -5px 15px #ffffff',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        whileHover={{
          transform: 'translateY(-5px)',
          boxShadow: '8px 8px 20px #d1d1d1, -8px -8px 20px #ffffff'
        }}
      >
        <motion.div 
          className="stat-value" 
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            lineHeight: 1
          }}
        >
          {count}+
        </motion.div>
        <div className="stat-label" style={{
          fontSize: '1.1rem',
          color: '#4a5568',
          fontWeight: 500
        }}>
          {label}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="about-page" style={{
      maxWidth: '100%',
      margin: 0,
      backgroundColor: 'var(--color-bg-primary)',
      color: 'var(--color-text-primary)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Hero Section */}
      <section className="hero-section" style={{
        position: 'relative',
        padding: '8rem 2rem 6rem',
        background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              style={{ marginBottom: '3rem', textAlign: 'center' }}
            >
              <motion.div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem',
                  position: 'relative'
                }}
              >
                <motion.span 
                  className="studio-title-white"
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(79, 70, 229, 0.8)',
                    color: 'white',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '50px',
                    fontSize: '1.2rem',
                    zIndex: 2,
                    WebkitTextFillColor: 'white',
                    textShadow: 'none'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Inside the Studio
                </motion.span>
              </motion.div>
              
              <motion.h1 
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  margin: '0 0 2rem 0',
                  color: '#ffffff',
                  lineHeight: 1.1,
                  textAlign: 'center',
                  maxWidth: '1000px',
                  margin: '0 auto 2rem',
                  padding: '0 2rem',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Where Innovation Meets Precision
              </motion.h1>
              
              <motion.p 
                style={{
                  fontSize: '1.25rem',
                  lineHeight: 1.7,
                  color: '#ffffff',
                  maxWidth: '700px',
                  margin: '0 auto 2.5rem',
                  fontWeight: 400
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                We're a passionate team of designers, developers, and strategists dedicated to creating exceptional digital experiences that help businesses thrive in the digital landscape.
              </motion.p>
              
              <motion.div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/booking" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '0.875rem 2rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'white',
                      backgroundColor: '#4f46e5',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)'
                    }}
                  >
                    Get Started
                  </motion.button>
                </Link>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '0.875rem 2rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#4f46e5',
                      backgroundColor: 'transparent',
                      border: '2px solid #4f46e5',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Stats Section */}
            <motion.div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.5rem',
                marginTop: '2rem',
                padding: '0 1rem'
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="stats-grid-responsive"
            >
              {stats.map((stat) => (
                <Counter 
                  key={stat.id}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(79, 70, 229, 0) 70%)',
            zIndex: -1
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-200px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0) 70%)',
            zIndex: -1
          }} />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="about-hero" style={{
        padding: 'calc(var(--spacing-xxl) * 1.5) 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} style={{ marginBottom: 'var(--spacing-xl)' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <Logo size={80} withText={true} />
                <motion.div 
                  style={{
                    width: '80px',
                    height: '2px',
                    backgroundColor: '#8b5cf6',
                    marginTop: '1.5rem'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 'var(--spacing-lg)',
              alignItems: 'center',
            }}
            className="about-hero-grid-responsive"
            >
              <motion.div variants={fadeInUp}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  marginBottom: '1.5rem',
                  lineHeight: 1.4,
                  color: '#ffffff',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
                  letterSpacing: '-0.01em',
                  maxWidth: '90%'
                }}>
                  Where innovation meets precision in digital craftsmanship. We transform visions into impactful digital realities through strategic design and cutting-edge technology.
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
                  maxWidth: '100%',
                  fontWeight: 400
                }}>
                  Established with a vision to redefine digital excellence, Cyber Monk Studioz is a collective of passionate designers and developers dedicated to creating sophisticated digital experiences. Our approach combines aesthetic sensibility with technical expertise to deliver solutions that not only look exceptional but drive measurable results.
                </p>
                <p style={{
                  fontSize: '20px',
                  lineHeight: 1.75,
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
                  maxWidth: '90%'
                }}>
                  We take a collaborative approach to every project, working closely with our clients to understand their goals and create solutions that exceed their expectations.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '2rem',
                  position: 'relative',
                  height: '100%'
                }}
              >
                <motion.div
                  style={{
                    display: 'inline-block',
                    position: 'relative',
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
                  }}
                  whileHover={{
                    scale: 1.1,
                    filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.4))',
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 8
                    }
                  }}
                >
                  <img 
                    src="/CMSLogoCrop.png" 
                    alt="Cyber Monk Studioz Logo"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      maxHeight: '320px',
                      objectFit: 'contain',
                      display: 'block',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <style jsx={"true"}>{`
          .director-card:hover .member-bio {
            opacity: 1 !important;
          }
          
          .director-card:hover .member-bio p {
            animation: fadeInUp 0.5s ease forwards;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Values Section */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div 
              style={{
                textAlign: 'center',
                marginBottom: '4rem'
              }}
              variants={staggerContainer}
            >
              <motion.span 
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  display: 'inline-block',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  backgroundColor: '#4f46e5',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '25px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  default: { delay: 0.2 },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }
                }}
              >
                Our Core Values
              </motion.span>
              <motion.h2 
                style={{
                  fontSize: '2.75rem',
                  fontWeight: 800,
                  margin: '0.5rem 0 1.5rem',
                  background: 'linear-gradient(90deg, #1a202c, #4a5568)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2
                }}
              >
                Principles That Guide Us
              </motion.h2>
              <motion.div 
                style={{
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)',
                  margin: '0 auto',
                  borderRadius: '2px'
                }}
              />
            </motion.div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.5rem',
                marginTop: '2rem',
                padding: '0 1rem'
              }}
              className="values-grid-responsive"
            >
              {[
                {
                  icon: <FaLightbulb style={{
                    fontSize: '2.5rem',
                    color: '#4f46e5',
                    marginBottom: '1.5rem'
                  }} />,
                  title: 'Innovation',
                  description: 'We embrace creativity and innovation to deliver cutting-edge solutions that stand out in the digital landscape.'
                },
                {
                  icon: <FaHandsHelping style={{
                    fontSize: '2.5rem',
                    color: '#4f46e5',
                    marginBottom: '1.5rem'
                  }} />,
                  title: 'Collaboration',
                  description: 'We believe in the power of teamwork and work closely with clients to transform their visions into reality.'
                },
                {
                  icon: <FaRocket style={{
                    fontSize: '2.5rem',
                    color: '#4f46e5',
                    marginBottom: '1.5rem'
                  }} />,
                  title: 'Excellence',
                  description: 'We pursue excellence in every project, ensuring the highest quality standards and attention to detail.'
                },
                {
                  icon: <FaHeart style={{
                    fontSize: '2.5rem',
                    color: '#4f46e5',
                    marginBottom: '1.5rem'
                  }} />,
                  title: 'Passion',
                  description: 'Our love for design and technology drives us to create exceptional digital experiences that make an impact.'
                },
                {
                  icon: <FaUsers style={{
                    fontSize: '2.5rem',
                    color: '#4f46e5',
                    marginBottom: '1.5rem'
                  }} />,
                  title: 'Integrity',
                  description: 'We conduct our business with honesty, transparency, and respect for our clients and team members.'
                },
                {
                  icon: <FaChartLine style={{
                    fontSize: '2.5rem',
                    color: '#4f46e5',
                    marginBottom: '1.5rem'
                  }} />,
                  title: 'Impact',
                  description: 'We measure our success by the positive impact we create for our clients and their businesses.'
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  style={{
                    backgroundColor: '#fff',
                    padding: '2.5rem 2rem',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                    border: '1px solid rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 1
                  }}
                  whileHover={{
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 40px rgba(79, 70, 229, 0.12)',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%)',
                    zIndex: -1,
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }} 
                  className="hover-bg"
                  />
                  {value.icon}
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: '#ffffff',
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    {value.title}
                    <span style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: 0,
                      width: '40px',
                      height: '3px',
                      background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)',
                      borderRadius: '3px',
                      transition: 'width 0.3s ease'
                    }} className="underline" />
                  </h3>
                  <p style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: '#4a5568',
                    margin: 0,
                    transition: 'color 0.3s ease'
                  }}>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, rgba(79, 70, 229, 0) 70%)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0) 70%)',
          zIndex: 0
        }} />
      </section>

      {/* Team Section */}
<section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ width: '100%' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <motion.span 
                style={{
                  display: 'inline-block',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '25px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  default: { delay: 0.2 },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }
                }}
              >
                Studio Collective
              </motion.span>
              <motion.h2 
                style={{
                  fontSize: '2.75rem',
                  fontWeight: 800,
                  margin: '0.5rem 0 1.5rem',
                  color: '#ffffff',
                  lineHeight: 1.2
                }}
              >
                The Minds Behind the Studio
              </motion.h2>
              <motion.div 
                style={{
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)',
                  margin: '0 auto',
                  borderRadius: '2px'
                }}
              />
            </div>

            <motion.div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4rem',
              marginTop: '2rem'
            }}>
              {/* Directors Section */}
              <motion.div 
                variants={fadeInUp}
                style={{ marginBottom: '5rem' }}
              >
                <h3 style={{
                  textAlign: 'center',
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '2.5rem',
                  color: '#ffffff',
                  position: 'relative',
                  display: 'inline-block',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '0 1.5rem'
                }}>
                  Directors
                  <span style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)',
                    borderRadius: '3px'
                  }} />
                </h3>
                
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '2rem',
                    margin: '0 auto',
                    width: '100%',
                    maxWidth: '1200px',
                    padding: '1rem'
                  }}
                  className="directors-grid-responsive"
                >
                  {[{
                    name: 'Srihariharan',
                    role: 'Creative Director',
                    image: sgkImg,
                    bio: 'Creative Director at Cyber Monk Studioz, leading concept, design, and visual storytelling with a sharp focus on clarity, emotion, and brand impact.'
                  }, {
                    name: 'Aaruhya Kumar',
                    role: 'Design Director',
                    image: aaruhyaImg,
                    bio: 'Design Director at Cyber Monk Studioz, overseeing visual design, aesthetics, and execution with a strong focus on detail, balance, and brand consistency.'
                  }, {
                    name: 'Nishanth Ravikumar',
                    role: 'Business Director',
                    image: NishanthImg,
                    bio: 'Business Director at Cyber Monk Studioz, driving strategy, client relationships, and growth while aligning creative vision with business goals.'
                  }].map((member, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'visible',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      position: 'relative',
                      zIndex: 1,
                      transform: 'translateZ(0)'
                    }}
                    className="team-member-card"
                    whileHover={{
                      transform: 'translateY(-8px) scale(1.02) translateZ(0)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <div style={{ 
                      position: 'relative', 
                      width: '100%', 
                      maxWidth: '350px',
                      height: '350px', 
                      overflow: 'hidden', 
                      margin: '0 auto',
                      borderRadius: '16px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                    }} className="team-member-image-container">
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                        <img 
                          src={member.image} 
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.6s ease',
                          }}
                        />
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '1.5rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                        color: 'white',
                        textAlign: 'left',
                        borderRadius: '0 0 16px 16px',
                        transformOrigin: 'bottom',
                        zIndex: 2,
                        backdropFilter: 'blur(4px)'
                      }} className="member-bio">
                        <p style={{
                          margin: 0,
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          marginBottom: '1rem',
                          color: '#ffffff',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>
                          {member.bio}
                        </p>
                      </div>
                    </div>
                    <div style={{ 
                      padding: '1.5rem',
                      textAlign: 'center',
                      position: 'relative',
                      zIndex: 3,
                      backgroundColor: '#ffffff',
                      borderRadius: '0 0 16px 16px'
                    }}>
                      <h3 style={{
                        margin: '0 0 0.25rem',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#1a202c'
                      }}>
                        {member.name}
                      </h3>
                      <p style={{
                        color: '#4f46e5',
                        margin: '0 0 1rem',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              </motion.div>
              
              {/* Creative Unit Section */}
              <motion.div 
                variants={fadeInUp}
                style={{ margin: '5rem 0' }}
              >
                <h3 style={{
                  textAlign: 'center',
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '2.5rem',
                  color: '#ffffff',
                  position: 'relative',
                  display: 'inline-block',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '0 1.5rem'
                }}>
                  Creative Unit
                  <span style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)',
                    borderRadius: '3px'
                  }} />
                </h3>
                
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '1.5rem',
                    margin: '0 auto',
                    width: '100%',
                    maxWidth: '900px',
                    padding: '0.5rem'
                  }}
                  className="creative-unit-grid-responsive"
                >
                  {[{
                  name: 'Rahav',
                  role: 'App Developer',
                  image: ragavImg,
                  bio: 'App Developer at Cyber Monk Studioz, building intuitive, high-performance mobile applications with a strong focus on usability and clean design.'
                }, {
                  name: 'Monick Kannan',
                  role: 'Web Developer',
                  image: monickImg,
                  bio: 'Web Developer at Cyber Monk Studioz, developing responsive, scalable websites that blend performance, design, and functionality.'
                }].map((member, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'visible',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      position: 'relative',
                      zIndex: 1,
                      transform: 'translateZ(0)'
                    }}
                    className="team-member-card"
                    whileHover={{
                      transform: 'translateY(-8px) scale(1.02) translateZ(0)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <div style={{ 
                      position: 'relative', 
                      width: '100%', 
                      maxWidth: '350px',
                      height: '350px', 
                      overflow: 'hidden', 
                      margin: '0 auto',
                      borderRadius: '16px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                    }} className="team-member-image-container">
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                        <img 
                          src={member.image} 
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.6s ease',
                          }}
                        />
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '1.5rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                        color: 'white',
                        textAlign: 'left',
                        borderRadius: '0 0 16px 16px',
                        transformOrigin: 'bottom',
                        zIndex: 2,
                        backdropFilter: 'blur(4px)'
                      }} className="member-bio">
                        <p style={{
                          margin: 0,
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          marginBottom: '1rem',
                          color: '#ffffff',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>
                          {member.bio}
                        </p>
                      </div>
                    </div>
                    <div style={{ 
                      padding: '1.5rem',
                      textAlign: 'center',
                      position: 'relative',
                      zIndex: 3,
                      backgroundColor: '#ffffff',
                      borderRadius: '0 0 16px 16px'
                    }}>
                      <h3 style={{
                        margin: '0 0 0.25rem',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#1a202c'
                      }}>
                        {member.name}
                      </h3>
                      <p style={{
                        color: '#4f46e5',
                        margin: '0 0 1rem',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
                </div>
              </motion.div>
              
              {/* Design Unit Section */}
              <motion.div 
                variants={fadeInUp}
                style={{ margin: '5rem 0' }}
              >
                <h3 style={{
                  textAlign: 'center',
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '2.5rem',
                  color: '#ffffff',
                  position: 'relative',
                  display: 'inline-block',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '0 1.5rem'
                }}>
                  Design Unit
                  <span style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)',
                    borderRadius: '3px'
                  }} />
                </h3>
                
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '1.5rem',
                    margin: '0 auto',
                    width: '100%',
                    maxWidth: '900px',
                    padding: '0.5rem'
                  }}
                  className="design-unit-grid-responsive"
                >
                  {[{
                    name: 'Harish',
                    role: 'Video Editor',
                    image: harishImg,
                    bio: 'Video Editor at Cyber Monk Studioz, crafting compelling visual stories through expert video editing, motion graphics, and post-production excellence.'
                  }].map((member, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'visible',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      position: 'relative',
                      zIndex: 1,
                      transform: 'translateZ(0)'
                    }}
                    className="team-member-card"
                    whileHover={{
                      transform: 'translateY(-8px) scale(1.02) translateZ(0)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <div style={{ 
                      position: 'relative', 
                      width: '100%', 
                      maxWidth: '350px',
                      height: '350px', 
                      overflow: 'hidden', 
                      margin: '0 auto',
                      borderRadius: '16px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                    }} className="team-member-image-container">
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                        <img 
                          src={member.image} 
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.6s ease',
                          }}
                        />
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '1.5rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                        color: 'white',
                        textAlign: 'left',
                        borderRadius: '0 0 16px 16px',
                        transformOrigin: 'bottom',
                        zIndex: 2,
                        backdropFilter: 'blur(4px)'
                      }} className="member-bio">
                        <p style={{
                          margin: 0,
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          marginBottom: '1rem',
                          color: '#ffffff',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}>
                          {member.bio}
                        </p>
                      </div>
                    </div>
                    <div style={{ 
                      padding: '1.5rem',
                      textAlign: 'center',
                      position: 'relative',
                      zIndex: 3,
                      backgroundColor: '#ffffff',
                      borderRadius: '0 0 16px 16px'
                    }}>
                      <h3 style={{
                        margin: '0 0 0.25rem',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#1a202c'
                      }}>
                        {member.name}
                      </h3>
                      <p style={{
                        color: '#4f46e5',
                        margin: '0 0 1rem',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, rgba(79, 70, 229, 0) 70%)',
            zIndex: 0
          }} />
        </div>
      </section>
    </div>
  );
}

export default About;
