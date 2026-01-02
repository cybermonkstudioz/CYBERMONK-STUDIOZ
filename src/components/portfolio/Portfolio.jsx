import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [tappedProject, setTappedProject] = useState(null);
  
  // Check if device supports hover
  const isHoverDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia && window.matchMedia('(hover: hover)').matches;
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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'web',
      description: 'A full-featured e-commerce solution with modern design',
      image: 'https://source.unsplash.com/random/800x600/?ecommerce',
      url: '/portfolio/ecommerce-platform',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Mobile App Dashboard',
      category: 'app',
      description: 'Clean and intuitive interface design for mobile dashboard',
      image: 'https://source.unsplash.com/random/800x600/?mobile,app,dashboard',
      url: '/portfolio/mobile-app-dashboard',
      tags: ['React Native', 'Interface Design']
    },
    {
      id: 3,
      title: 'Brand Identity',
      category: 'branding',
      description: 'Complete brand identity for a modern startup',
      image: 'https://source.unsplash.com/random/800x600/?branding',
      url: '/portfolio/brand-identity',
      tags: ['Logo Design', 'Brand Guidelines']
    },
    {
      id: 4,
      title: 'Web Application',
      category: 'web',
      description: 'Custom web application for business automation',
      image: 'https://source.unsplash.com/random/800x600/?webapp',
      url: '/portfolio/web-application',
      tags: ['Vue.js', 'Django', 'PostgreSQL']
    },
    {
      id: 5,
      title: 'Marketing Website',
      category: 'web',
      description: 'High-converting marketing website with analytics',
      image: 'https://source.unsplash.com/random/800x600/?marketing',
      url: '/portfolio/marketing-website',
      tags: ['Gatsby', 'Contentful']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'app', name: 'Mobile Apps' },
    { id: 'branding', name: 'Branding' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
    
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

  return (
    <div className="portfolio-page" style={{
      width: '100%',
      backgroundColor: 'var(--color-bg-primary)',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      {/* Hero Section */}
      <section style={{
        ...styles.section,
        paddingTop: '8rem',
        paddingBottom: '4rem',
        backgroundColor: 'var(--color-bg-primary)',
      }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} style={styles.sectionTitle}>
            <h2 style={styles.heading2}>Our Portfolio</h2>
            <div style={styles.divider} />
            <p style={{
              ...styles.paragraph,
              maxWidth: '700px',
              margin: '0 auto',
              textAlign: 'center',
              fontSize: '1.2rem',
              color: '#ffffff',
            }}>
              Discover our collection of innovative projects and creative solutions that have helped our clients achieve their business goals.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <section style={{
        ...styles.section,
        paddingTop: '0',
        backgroundColor: 'var(--color-bg-primary)',
      }}>
        <div style={styles.container}>
          {/* Filter Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center',
              marginBottom: '2rem',
              padding: '0 1rem'
            }}
            className="portfolio-filters-responsive"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={fadeInUp}
                onClick={() => setActiveFilter(category.id)}
                style={{
                  padding: '0.5rem 1.2rem',
                  backgroundColor: activeFilter === category.id ? 'var(--color-accent)' : 'transparent',
                  color: activeFilter === category.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  border: `1px solid ${activeFilter === category.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                }}
                className="portfolio-filter-button"
                whileHover={{
                  backgroundColor: activeFilter === category.id ? 'var(--color-accent-light)' : 'var(--color-bg-tertiary)',
                  borderColor: activeFilter === category.id ? 'var(--color-accent-light)' : 'var(--color-accent)',
                }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{
              ...styles.grid,
              gridTemplateColumns: '1fr',
              gap: '1.5rem',
              padding: '0 1rem'
            }}
            className="portfolio-grid-responsive"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                style={{
                  ...styles.card,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => {
                  // Only enable hover on hover-capable devices
                  if (isHoverDevice()) {
                    setHoveredProject(project.id);
                  }
                }}
                onMouseLeave={() => {
                  // Only enable hover on hover-capable devices
                  if (isHoverDevice()) {
                    setHoveredProject(null);
                  }
                }}
                onClick={() => {
                  // For touch devices, toggle the tapped state
                  if (!isHoverDevice()) {
                    setTappedProject(tappedProject === project.id ? null : project.id);
                  }
                }}
                onTouchStart={(e) => {
                  // Prevent default to avoid any conflicts
                  if (!isHoverDevice()) {
                    e.preventDefault();
                  }
                }}
              >
                {/* Mobile: Fixed height with flex layout, Desktop: Aspect ratio */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: isHoverDevice() ? 'auto' : '500px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Image Container */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: isHoverDevice() ? '100%' : '45%',
                    overflow: 'hidden',
                  }}>
                    <img 
                      src={project.image} 
                      alt=""
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        transform: (hoveredProject === project.id || tappedProject === project.id) ? 'scale(1.05)' : 'scale(1)',
                      }}
                    />
                    
                    {/* Desktop Overlay */}
                    {isHoverDevice() && (
                      <AnimatePresence>
                        {hoveredProject === project.id && (
                          <motion.div
                            key={`overlay-${project.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(to bottom, rgba(118, 75, 162, 0.1), rgba(118, 75, 162, 0.8))',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              padding: '1.5rem',
                              color: 'var(--color-text-primary)',
                            }}
                          >
                            <h3 style={{
                              fontSize: '1.5rem',
                              fontWeight: 600,
                              marginBottom: '0.5rem',
                              color: '#ffffff',
                              lineHeight: 1.3,
                            }}>
                              {project.title}
                            </h3>
                            <p style={{
                              fontSize: '0.95rem',
                              marginBottom: '1rem',
                              opacity: 0.9,
                              lineHeight: 1.6,
                              color: '#ffffff',
                            }}>
                              {project.description}
                            </p>
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '0.4rem',
                              marginBottom: '1.5rem',
                            }}>
                              {project.tags.map((tag, i) => (
                                <span 
                                  key={i} 
                                  style={{
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '50px',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div style={{
                              display: 'flex',
                              gap: '1rem',
                            }}>
                              <Link
                                to={project.url}
                                className="portfolio-view-details-btn"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  padding: '0.6rem 1.2rem',
                                  backgroundColor: 'var(--color-accent)',
                                  color: 'var(--color-text-primary)',
                                  borderRadius: '6px',
                                  textDecoration: 'none',
                                  fontSize: '0.9rem',
                                  fontWeight: 500,
                                  transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                View Details
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                  
                  {/* Mobile Content Area - Always Visible */}
                  {!isHoverDevice() && (
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '55%',
                      background: 'var(--color-card-bg)',
                      padding: '1.2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      overflow: 'visible',
                    }}>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        marginBottom: '0.6rem',
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.3,
                        overflow: 'visible',
                        textOverflow: 'clip',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                      }}>
                        {project.title}
                      </h3>
                      <p style={{
                        fontSize: '0.85rem',
                        marginBottom: '0.8rem',
                        opacity: 0.9,
                        lineHeight: 1.4,
                        color: 'var(--color-text-secondary)',
                        overflow: 'visible',
                        display: 'block',
                        wordWrap: 'break-word',
                      }}>
                        {project.description}
                      </p>
                      <div className="tags" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: '1rem',
                        overflow: 'visible',
                      }}>
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            style={{
                              background: 'rgba(255, 255, 255, 0.15)',
                              padding: '0.25rem 0.6rem',
                              borderRadius: '50px',
                              fontSize: '0.7rem',
                              fontWeight: 500,
                              whiteSpace: 'nowrap',
                              overflow: 'visible',
                              textOverflow: 'clip',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="buttons" style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexDirection: 'column',
                        marginTop: 'auto',
                      }}>
                        <Link
                          to={project.url}
                          className="portfolio-view-details-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.6rem 0.8rem',
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-text-primary)',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            transition: 'all 0.3s ease',
                            width: '100%',
                            minHeight: '40px',
                            textAlign: 'center',
                          }}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <motion.div
              variants={fadeInUp}
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '4rem 0',
              }}
            >
              <h3 style={{
                ...styles.heading3,
                color: '#ffffff',
                marginBottom: '1rem',
              }}>
                No projects found in this category
              </h3>
              <p style={{
                ...styles.paragraph,
                maxWidth: '600px',
                margin: '0 auto',
                color: '#ffffff',
              }}>
                We couldn't find any projects matching the selected category. Please try another filter or check back later for updates.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)',
        textAlign: 'center',
        backgroundColor: 'var(--color-bg-secondary)',
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
                color: 'var(--color-text-primary)',
              }}>
                Have a project in mind?
              </h2>
              <p style={{
                fontSize: '1.25rem',
                maxWidth: '700px',
                margin: '0 auto var(--spacing-xl)',
                opacity: 0.8,
                lineHeight: 1.7,
                color: '#ffffff',
              }}>
                Let's collaborate to bring your ideas to life. Get in touch to discuss your project and how we can help you achieve your goals.
              </p>
              <Link 
                to="/booking" 
                className="btn btn-primary"
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--color-accent)',
                }}
                onMouseOver={(e) => {
                  // Only enable hover on hover-capable devices
                  if (isHoverDevice()) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }
                }}
                onMouseOut={(e) => {
                  // Only enable hover on hover-capable devices
                  if (isHoverDevice()) {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }
                }}
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Add mobile responsive styles with icon removal
const mobileStyles = `
  @media (max-width: 768px) {
    .portfolio-grid-responsive {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
      padding: 0 1rem !important;
    }
    
    /* Remove ALL icons from portfolio buttons */
    .portfolio-grid-responsive .buttons a svg,
    .portfolio-grid-responsive .buttons a i,
    .portfolio-grid-responsive .buttons a .fa,
    .portfolio-grid-responsive .buttons a::before,
    .portfolio-grid-responsive .buttons a::after {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      width: 0 !important;
      height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    .portfolio-filters-responsive {
      gap: 0.5rem !important;
      margin-bottom: 2rem !important;
    }
    
    .portfolio-filter-button {
      font-size: 0.75rem !important;
      padding: 0.4rem 1rem !important;
    }
    
    /* Mobile card structure - UPDATED */
    .portfolio-grid-responsive > div {
      height: 500px !important; /* Increased height */
      touch-action: manipulation !important;
    }
    
    .portfolio-grid-responsive > div > div:first-child {
      display: flex !important;
      flex-direction: column !important;
    }
    
    /* Remove any potential touch delays */
    .portfolio-grid-responsive > div,
    .portfolio-grid-responsive a,
    .portfolio-grid-responsive button {
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1) !important;
      touch-action: manipulation !important;
    }
    
    /* Better mobile touch feedback */
    .portfolio-grid-responsive > div:active {
      transform: scale(0.98) !important;
      transition: transform 0.1s ease !important;
    }
    
    /* Mobile image container */
    .portfolio-grid-responsive > div > div:first-child > div:first-child {
      height: 45% !important; /* Adjusted image height */
      position: relative !important;
      overflow: hidden !important;
    }
    
    /* Mobile content area */
    .portfolio-grid-responsive > div > div:first-child > div:last-child {
      height: 55% !important; /* Adjusted content height */
      background: var(--color-card-bg) !important;
      padding: 1.2rem !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      overflow: visible !important; /* Allow content to be visible */
    }
    
    /* Mobile text styles - NO CUT OFF */
    .portfolio-grid-responsive h3 {
      font-size: 1.2rem !important;
      line-height: 1.3 !important;
      margin-bottom: 0.6rem !important;
      white-space: normal !important;
      overflow: visible !important;
      text-overflow: clip !important;
      word-wrap: break-word !important;
    }
    
    .portfolio-grid-responsive p {
      font-size: 0.85rem !important;
      line-height: 1.4 !important;
      margin-bottom: 0.8rem !important;
      overflow: visible !important;
      display: block !important;
      word-wrap: break-word !important;
    }
    
    .portfolio-grid-responsive .tags {
      gap: 0.4rem !important;
      margin-bottom: 1rem !important;
      overflow: visible !important;
      flex-wrap: wrap !important;
    }
    
    .portfolio-grid-responsive .tags span {
      font-size: 0.7rem !important;
      padding: 0.25rem 0.6rem !important;
      white-space: nowrap !important;
      overflow: visible !important;
      text-overflow: clip !important;
    }
    
    .portfolio-grid-responsive .buttons {
      flex-direction: column !important;
      gap: 0.4rem !important;
      margin-top: auto !important;
      width: 100% !important;
    }
    
    .portfolio-grid-responsive .buttons a {
      width: 100% !important;
      padding: 0.6rem 0.8rem !important;
      font-size: 0.75rem !important;
      min-height: 40px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
    }
  }
  
  /* Remove ALL icons from portfolio buttons globally */
  .portfolio-grid-responsive .buttons a svg,
  .portfolio-grid-responsive .buttons a i,
  .portfolio-grid-responsive .buttons a .fa,
  .portfolio-grid-responsive .buttons a::before,
  .portfolio-grid-responsive .buttons a::after,
  .portfolio-grid-responsive .buttons a [class*="icon"],
  .portfolio-grid-responsive .buttons a [class*="Icon"],
  .portfolio-grid-responsive .buttons a *[class^="fa-"],
  .portfolio-grid-responsive .buttons a *[class*="search"],
  .portfolio-grid-responsive .buttons a *[class*="external"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    position: absolute !important;
    left: -9999px !important;
  }
  
  /* Extra aggressive removal - target any element with icon-related attributes */
  .portfolio-grid-responsive .buttons a *[data-icon],
  .portfolio-grid-responsive .buttons a *[aria-label*="icon"],
  .portfolio-grid-responsive .buttons a *[title*="icon"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  
  /* Ultra-specific targeting of portfolio view details buttons */
  .portfolio-view-details-btn *,
  .portfolio-view-details-btn::before,
  .portfolio-view-details-btn::after,
  .portfolio-view-details-btn svg,
  .portfolio-view-details-btn i,
  .portfolio-view-details-btn .fa,
  .portfolio-view-details-btn [class*="icon"],
  .portfolio-view-details-btn [class*="Icon"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    position: absolute !important;
    left: -9999px !important;
  }
  
  /* Hide broken images and any alt text completely */
  .portfolio-grid-responsive img[alt=""],
  .portfolio-grid-responsive img:not([src]),
  .portfolio-grid-responsive img[src=""],
  .portfolio-grid-responsive img {
    /* Hide broken images */
  }
  
  .portfolio-grid-responsive img::before {
    content: "" !important;
    display: none !important;
  }
  
  .portfolio-grid-responsive img::after {
    content: "" !important;
    display: none !important;
  }
  
  /* Force text-only content for portfolio buttons */
  .portfolio-view-details-btn {
    content: "View Details" !important;
  }
  
  .portfolio-view-details-btn::before {
    content: "" !important;
  }
  
  .portfolio-view-details-btn::after {
    content: "" !important;
  }
  
  @media (min-width: 769px) {
    .portfolio-grid-responsive {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
      gap: 2rem !important;
      padding: 0 !important;
    }
    
    /* Desktop styles - restore original behavior */
    .portfolio-grid-responsive > div {
      height: auto !important;
    }
    
    .portfolio-grid-responsive > div > div:first-child {
      position: relative !important;
      padding-top: 66.67% !important;
      height: 0 !important;
      display: block !important;
    }
    
    .portfolio-grid-responsive > div > div:first-child > div {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
    }
  }
  
  @media (min-width: 1024px) {
    .portfolio-grid-responsive {
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)) !important;
    }
  }
`;

const styleElement = document.createElement('style');
styleElement.textContent = mobileStyles;
document.head.appendChild(styleElement);

export default Portfolio;
