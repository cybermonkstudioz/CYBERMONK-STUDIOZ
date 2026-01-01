import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearchPlus, FaExternalLinkAlt } from 'react-icons/fa';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

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
  
  const cardHover = {
    scale: 1.02,
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  };

  const projects = [];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'app', name: 'Mobile Apps' },
    { id: 'design', name: 'UI/UX Design' },
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
    <div style={styles.container}>
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
        backgroundColor: 'var(--color-bg-secondary)',
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
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div style={{
                  position: 'relative',
                  paddingTop: '66.67%', // 3:2 aspect ratio
                  overflow: 'hidden',
                }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      transform: hoveredProject === project.id ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
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
                          gap: '0.5rem',
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
                            onMouseEnter={(e) => e.stopPropagation()}
                          >
                            <FaSearchPlus style={{ marginRight: '0.5rem' }} />
                            View Details
                          </Link>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '0.6rem 1.2rem',
                              backgroundColor: 'rgba(157, 80, 187, 0.2)',
                              color: 'var(--color-text-primary)',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontSize: '0.9rem',
                              fontWeight: 500,
                              transition: 'all 0.3s ease',
                              border: '1px solid rgba(157, 80, 187, 0.3)',
                            }}
                            onMouseEnter={(e) => e.stopPropagation()}
                          >
                            <FaExternalLinkAlt style={{ marginRight: '0.5rem' }} />
                            Live Demo
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                  transform: hoveredProject === project.id ? 'translateY(100%)' : 'translateY(0)',
                  transition: 'transform 0.3s ease',
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    margin: 0,
                    color: '#fff',
                    marginBottom: '0.25rem',
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem',
                    textTransform: 'capitalize',
                    marginBottom: '0.5rem',
                  }}>
                    {project.category}
                  </p>
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
        background: 'linear-gradient(135deg, var(--color-bg-tertiary) 0%, var(--color-bg-secondary) 100%)',
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
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
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

// Add mobile responsive styles
const mobileStyles = `
  @media (max-width: 768px) {
    .portfolio-grid-responsive {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
      padding: 0 1rem !important;
    }
    
    .portfolio-filters-responsive {
      gap: 0.5rem !important;
      margin-bottom: 2rem !important;
    }
    
    .portfolio-filter-button {
      font-size: 0.75rem !important;
      padding: 0.4rem 1rem !important;
    }
  }
  
  @media (min-width: 769px) {
    .portfolio-grid-responsive {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
      gap: 2rem !important;
      padding: 0 !important;
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
